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


# * User class definition with BaseModel
class NewLeague(BaseModel):
    league_name: str  # Name of the league
    country: str  # Country league's played in
    city: str  # City where league's played in
    admins: dict  # Admins for league dict(id : username)
    description: Optional[str]  # Description of the league


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

    # Use the league_name as the key and store the league_dict in data dict
    data[new_league.league_name] = league_dict

    # Store the data back to the file
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    # Clear the temp dict
    data = {}

    # Return a success message
    return {"Create League": "SUCCESS", "Info": "League successfully created"}


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
