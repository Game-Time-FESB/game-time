# * Importing necessary modules from FastAPI, typing and pydantic
from fastapi import FastAPI, Path, Request
from starlette.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel

# * Imports for storing and handling data
from cryptography.fernet import InvalidToken, Fernet
from dotenv import load_dotenv
import json
import os

# * Creating an instance of FastAPI
app = FastAPI()

# * Fixes the CORS issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# * Getting the key for data encryption
load_dotenv()

key = os.getenv("ENCRYPTION_KEY")
if key is None:
    print("ERROR - No key")
else:
    key = key.encode()

cipher_suite = Fernet(key)


# * New league class definition
class NewLeague(BaseModel):
    league_name: str  # Name of the league
    country: str  # Country league's played in
    city: str  # City where league's played in
    description: Optional[str]  # Description of the league
    photo: Optional[str] = "photo"  # Image for league profile
    admins: dict  # Admins for league dict(id : username)


# * Update league class definition
class UpdateLeague(BaseModel):
    league_name: str  # Name of the league
    country: str  # Country league's played in
    city: str  # City where league's played in
    description: Optional[str] = None  # Description of the league
    photo: Optional[str] = None  # Image for league profile
    admins: Optional[dict] = None  # Admins for league dict(id : username)


# * New team class definition
class NewTeam(BaseModel):
    league_in: str  # Name of the league team's in
    city_in: str  #  Name of the city team's in
    team_name: str  # Name of the team
    description: Optional[str]  # Description of the team
    photo: Optional[str] = "photo"  # Image for teams profile
    players: dict  # Players on the team ({"name" : dict})


# * Update team class definition
class UpdateTeam(BaseModel):
    league_in: str  # Name of the league team's in
    city_in: str  # Name of the city team's in
    team_name: str  # Name of the team
    description: Optional[str] = None  # Description of the team
    photo: Optional[str] = None  # Image for teams profile
    players: Optional[dict] = None  # Players on the team ({"name" : dict})


# * New match class definition
class NewMatch(BaseModel):
    league_in: str  # Name of the league in which the match is played
    city_in: str  # Name of the city in which the match is played
    home_team: str  # Name of the home team
    away_team: str  # Name of the away team
    date: str  # Date of the match
    time: str  # Time of the match
    goals_home: int  # Number of goals scored by the home team
    goals_home_info: dict  # Information about the goals scored by the home team
    goals_away: int  # Number of goals scored by the away team
    goals_away_info: dict  # Information about the goals scored by the away team
    finished: bool  # Boolean indicating whether the match has finished or not


# * Update match class definition
class UpdateMatch(BaseModel):
    match_id: str  # Id of the match 
    league_in: str  # Name of the league in which the match is played
    city_in: str  # Name of the city in which the match is played
    home_team: Optional[str] = None  # Name of the home team
    away_team: Optional[str] = None # Name of the away team
    date: Optional[str] = None # Date of the match
    time: Optional[str] = None # Time of the match
    goals_home: Optional[int] = None  # Number of goals scored by the home team
    goals_home_info: Optional[dict] = None  # Info about the goals scored by the home team
    goals_away: Optional[int] = None  # Number of goals scored by the away team
    goals_away_info: Optional[dict] = None  # Info about the goals scored by the away team
    finished: Optional[bool] = None  # Boolean indicating whether the match has finished or not


# * LeagueId class definition for get_league_info
class LeagueId(BaseModel):
    league_name: str
    city: str


# * Main dictionary used for temporary storage
data = {}


# * Default home page -> status check
@app.get("/")
def get_item():
    return {"Status": "OK"}


# * Endpoint for creating a new local league
@app.post("/create-league")
def create_league(new_league: NewLeague):
    # Convert the NewLeague object to a dictionary
    league_dict = new_league.dict()

    # Add needed keys for league dict
    league_dict["teams"] = {}
    league_dict["matches"] = {}

    # Define the filename based on the city
    filename = f"Database/{(new_league.city).lower()}_leagues.json"

    # Load the user data
    user_data = load_data("user_data")

    # Check if the file exists
    if os.path.exists(filename):
        # Load the data from the file
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Check if the league's name already exists
        if new_league.league_name in data.keys():
            return {"Create League": "FAILED", "Info": "League already exists"}
    else:
        # If the file doesn't exist, add "Country" and "City" keys to the data dict
        data = {"Country": new_league.country, "City": new_league.city}

    # Use the league_name as the key and store the league_dict in data dict
    data[new_league.league_name] = league_dict

    # Update the user data to include the new league they are admin of
    for admin_username in new_league.admins.values():
        for _, user_info in user_data.items():
            if user_info["username"] == admin_username:
                # Generate a unique id for the league
                league_id = str(len(user_info["admin_of"]) + 1)
                user_info["admin_of"][league_id] = {
                    "league_name": new_league.league_name,
                    "league_city": new_league.city,
                }

    # Save the updated user data
    save_data(user_data, "user_data")

    # Store the data back to the file
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    # Clear the temp dict
    data = {}

    # Return a success message
    return {"Create League": "SUCCESS", "Info": "League successfully created"}


# * Endpoint for adding a new team to a league
@app.post("/add-team")
def add_team(new_team: NewTeam):
    # Convert the NewTeam object to a dictionary
    team_dict = new_team.dict()

    # Define the filename based on the city
    filename = f"Database/{(new_team.city_in).lower()}_leagues.json"

    # Initialize an empty dictionary for data
    data = {}

    # Check if the file exists
    if os.path.exists(filename):
        # Load the data from the file
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Check if the league's name exists
    if new_team.league_in in data.keys():
        # Check if the 'teams' key exists
        if "teams" in data[new_team.league_in].keys():
            # Check if the team's name already exists
            if new_team.team_name in data[new_team.league_in]["teams"].keys():
                return {"Add Team": "FAILED", "Info": "Team already exists"}

            # Use the team_name as the key and store the team_dict in league's 'teams' data
            data[new_team.league_in]["teams"][new_team.team_name] = team_dict

            # Store the data back to the file
            with open(filename, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=4)

            # Clear the temp dict
            data = {}

            # Return a success message
            return {
                "Add Team": "SUCCESS",
                "Info": "Team successfully added to the league",
            }

        else:
            # If the 'teams' key doesn't exist, return an error message
            return {"Add Team": "ERROR", "Info": "'teams' key not found in the league"}

    else:
        # If the league doesn't exist, return an error message
        return {"Add Team": "ERROR", "Info": "League not found"}


# * Endpoint for adding a new match to a league
@app.post("/add-match")
def add_match(new_match: NewMatch):
    # Convert the NewMatch object to a dictionary
    match_dict = new_match.dict()

    # Define the filename based on the city
    filename = f"Database/{(new_match.city_in).lower()}_leagues.json"

    # Initialize an empty dictionary for data
    data = {}

    # Check if the file exists
    if os.path.exists(filename):
        # Load the data from the file
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Check if the league's name exists
        if new_match.league_in in data.keys():
            # Check if the 'matches' key exists
            if "matches" in data[new_match.league_in].keys():
                # Generate a unique match id
                match_id = str(len(data[new_match.league_in]["matches"]) + 1)

                # Check if the match id already exists
                if match_id in data[new_match.league_in]["matches"].keys():
                    return {"Add Match": "FAILED", "Info": "Match already exists"}

                # Use the match_id as the key and store the match_dict in league's 'matches' data
                data[new_match.league_in]["matches"][match_id] = match_dict

                # Store the data back to the file
                with open(filename, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)

                # Clear the temp dict
                data = {}

                # Return a success message
                return {
                    "Add Match": "SUCCESS",
                    "Info": "Match successfully added to the league",
                }

            else:
                # If the 'matches' key doesn't exist, return an error message
                return {
                    "Add Match": "ERROR",
                    "Info": "'matches' key not found in the league",
                }

        else:
            # If the league doesn't exist, return an error message
            return {"Add Match": "ERROR", "Info": "League not found"}

    else:
        # If the file doesn't exist, return an error message
        return {"Add Match": "ERROR", "Info": "File with data not found"}


@app.put("/update-league")
def update_league(updated_league: UpdateLeague):
    # Convert the UpdateLeague object to a dictionary
    league_dict = updated_league.dict()

    # Define the filename based on the city
    filename = f"Database/{(updated_league.city).lower()}_leagues.json"

    # Load the user data
    user_data = load_data("user_data")

    # Check if the file exists
    if os.path.exists(filename):
        # Load the data from the file
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Check if the league's name already exists
        if updated_league.league_name in data.keys():
            # Get the existing league data
            existing_league = data[updated_league.league_name]

            # Update only the fields which aren't None
            for key, value in league_dict.items():
                if value is not None:
                    existing_league[key] = value

            # Update the league's data
            data[updated_league.league_name] = existing_league

            # Update the user data to include the updated league they are admin of
            if updated_league.admins:
                for admin_username in updated_league.admins.values():
                    for _, user_info in user_data.items():
                        if user_info["username"] == admin_username:
                            # Generate a unique id for the league
                            league_id = str(len(user_info["admin_of"]) + 1)
                            user_info["admin_of"][league_id] = {
                                "league_name": updated_league.league_name,
                                "league_city": updated_league.city,
                            }

            # Save the updated user data
            save_data(user_data, "user_data")

            # Store the data back to the file
            with open(filename, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=4)

            # Clear the temp dict
            data = {}

            # Return a success message
            return {
                "Update League": "SUCCESS",
                "Info": "League successfully updated",
            }

        else:
            # If the league's name doesn't exist, return an error message
            return {"Update League": "FAILED", "Info": "League not found"}

    else:
        # If the file doesn't exist, return an error message
        return {"Update League": "ERROR", "Info": "File not found"}


# * Endpoint for updating team info
@app.put("/update-team")
def update_team(updated_team: UpdateTeam):
    # Convert the UpdateTeam object to a dictionary
    team_dict = updated_team.dict()

    # Define the filename based on the city
    filename = f"Database/{(updated_team.city_in).lower()}_leagues.json"

    # Initialize an empty dictionary for data
    data = {}

    # Check if the file exists
    if os.path.exists(filename):
        # Load the data from the file
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Check if the league's name exists
        if updated_team.league_in in data.keys():
            # Check if the 'teams' key exists
            if "teams" in data[updated_team.league_in].keys():
                # Check if the team's name already exists
                if updated_team.team_name in data[updated_team.league_in]["teams"].keys():
                    # Get the existing team data
                    existing_team = data[updated_team.league_in]["teams"][updated_team.team_name]

                    # Update only the non-None fields
                    for key, value in team_dict.items():
                        if value is not None:
                            existing_team[key] = value

                    # Update the team's data
                    data[updated_team.league_in]["teams"][updated_team.team_name] = existing_team

                    # Store the data back to the file
                    with open(filename, "w", encoding="utf-8") as f:
                        json.dump(data, f, ensure_ascii=False, indent=4)

                    # Clear the temp dict
                    data = {}

                    # Return a success message
                    return {
                        "Update Team": "SUCCESS",
                        "Info": "Team successfully updated in the league",
                    }

                else:
                    # If the team's name doesn't exist, return an error message
                    return {"Update Team": "FAILED", "Info": "Team not found"}

            else:
                # If the 'teams' key doesn't exist, return an error message
                return {"Update Team": "ERROR", "Info": "'teams' key not found in the league"}

        else:
            # If the league doesn't exist, return an error message
            return {"Update Team": "ERROR", "Info": "League not found"}

    else:
        # If the file doesn't exist, return an error message
        return {"Update Team": "ERROR", "Info": "File not found"}


# * Endpoint for updating match info
@app.put("/update-match")
def update_match(update_match: UpdateMatch):
    # Define the filename based on the city
    filename = f"Database/{(update_match.city_in).lower()}_leagues.json"

    # Initialize an empty dictionary for data
    data = {}

    # Check if the file exists
    if os.path.exists(filename):
        # Load the data from the file
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Check if the league's name exists
        if update_match.league_in in data.keys():
            # Check if the 'matches' key exists
            if "matches" in data[update_match.league_in].keys():
                # Check if the match id already exists
                if update_match.match_id in data[update_match.league_in]["matches"].keys():
                    # Update the match with the match_dict
                    for key, value in update_match.dict().items():
                        if value is not None:
                            data[update_match.league_in]["matches"][update_match.match_id][key] = value

                    # Store the data back to the file
                    with open(filename, "w", encoding="utf-8") as f:
                        json.dump(data, f, ensure_ascii=False, indent=4)

                    # Clear the temp dict
                    data = {}

                    # Return a success message
                    return {
                        "Update Match": "SUCCESS",
                        "Info": "Match successfully updated in the league",
                    }

                else:
                    # If the match id doesn't exist, return an error message
                    return {"Update Match": "ERROR", "Info": "Match not found"}

            else:
                # If the 'matches' key doesn't exist, return an error message
                return {
                    "Update Match": "ERROR",
                    "Info": "'matches' key not found in the league",
                }

        else:
            # If the league doesn't exist, return an error message
            return {"Update Match": "ERROR", "Info": "League not found"}

    else:
        # If the file doesn't exist, return an error message
        return {"Update Match": "ERROR", "Info": "File with data not found"}


# * Endpoint for getting all data (just for test)
@app.get("/all-data")
def get_data(city: str):
    # Define the filename based on the city
    filename = f"Database/{(city).lower()}_leagues.json"

    # Check if the file exists
    if os.path.exists(filename):
        # Load the data from the file
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        # If the file doesn't exist, return an error message
        return {"Get-data": "ERROR", "Info": "File with data not found"}

    # Return the data
    return Response(
        content=json.dumps(data, indent=4, ensure_ascii=False),
        media_type="application/json",
    )


# * Endpoint for getting all data for given league
@app.post("/get-league-info")
def get_league_info(league_id: LeagueId):
    try:
        # Define the filename based on the city
        filename = f"Database/{(league_id.city).lower()}_leagues.json"

        # Check if the file exists
        if os.path.exists(filename):
            # Load the data from the file
            with open(filename, "r", encoding="utf-8") as f:
                data = json.load(f)
        else:
            # If the file doesn't exist, return an error message
            return {"Get-league-info": "ERROR", "Info": "File with data not found"}

        # Create dict for returning wanted data
        league_info = {}

        # Find data for specified league in the json file
        for league_name, _ in data.items():
            if league_name == league_id.league_name:
                league_info = data[league_name]

        # If it was found return it, else error msg
        if league_info:
            return league_info
        else:
            return {"Get-league-info": "ERROR", "Info": "League was not found"}

    except Exception as e:
        # prints the error out
        print({"Get-league-info ERROR": f"{e}"})
        # If there's an error, return update error to front
        return {"Get-league-info": "ERROR"}


#! ------------------------- network unrelated functions


# * Function that loads the bin (json if needed) data (from optional file name) into a dictionary
def load_data(fileName: str = "user_data"):
    try:
        # Open the binary file and read the encrypted data
        with open(f"Database/{fileName}.bin", "rb") as file:
            encrypted_data = file.read()

        # Decrypt the data
        decrypted_data = cipher_suite.decrypt(encrypted_data)

        # Convert the decrypted data from JSON format to a Python dictionary
        data = json.loads(decrypted_data.decode())

    # If the data is not encrypted, read it as plain JSON from the .json file
    except (InvalidToken, FileNotFoundError):
        with open(f"Database/{fileName}.json", "r") as file:
            data = json.load(file)

    return data


# * Function that saves the dictionary data into a bin file (with optional file name)
def save_data(data, fileName: str = "user_data"):
    # Convert the data from a Python dictionary to JSON format
    data_string = json.dumps(data).encode()

    # Encrypt the data
    encrypted_data = cipher_suite.encrypt(data_string)

    # Open the binary file and write the encrypted data
    with open(f"Database/{fileName}.bin", "wb") as file:
        file.write(encrypted_data)
