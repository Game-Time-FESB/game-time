# * Importing necessary modules from FastAPI, typing and pydantic
from fastapi import FastAPI, Path, Request
from starlette.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel

# * Imports for storing and handling data
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


# * New league class definition with BaseModel
class NewLeague(BaseModel):
    league_name: str  # Name of the league
    country: str  # Country league's played in
    city: str  # City where league's played in
    description: Optional[str]  # Description of the league
    photo: Optional[str] = "photo"  # Image for league profile
    admins: dict  # Admins for league dict(id : username)


# * New team class definition with BaseModel
class NewTeam(BaseModel):
    league_in: str  # Name of the league team's in
    city_in: str  #  Name of the city team's in
    team_name: str  # Name of the team
    description: Optional[str]  # Description of the team
    photo: Optional[str] = "photo"  # Image for teams profile
    players: dict  # Players on the team ({"name" : dict})


# * New match class definition with BaseModel
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

    # Initialize an empty dictionary for data
    data = {}

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
