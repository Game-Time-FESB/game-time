# * Importing necessary modules from FastAPI, typing and pydantic
from fastapi import FastAPI, Path, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel

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


# * User class definition with Pydantic BaseModel
class User(BaseModel):
    name: str  # User's first name
    surname: str  # User's last name
    username: str  # User's username
    password: str  # User's password


# * Login class definition with Pydantic BaseModel
class Login(BaseModel):
    username: str  # Username for login
    password: str  # Password for login


class Delete(BaseModel):
    username: str


# * Initial data for testing
data = {
    0: {
        "name": "Test",
        "surname": "Testic",
        "username": "test1991",
        "password": "test123",
    }
}


# * Default home page -> status check
@app.get("/")
def get_item():
    return {"Status": "OK"}


# * Endpoint for logging in
@app.post("/log-in")
def log_in(login: Login):
    # Checking if the provided credentials match any user in the data
    for user in data.values():
        if user["username"] == login.username and user["password"] == login.password:
            return {"Log-in": "SUCCESS"}

    # If no match is found, return failed log-in
    return {"Log-in": "FAILED", "Info": "bad credentials"}


# * Endpoint for signing up
@app.post("/sign-up")
def sign_up(user: User):
    try:
        # Creating a new ID for the user
        new_id = max(data.keys()) + 1
        # Adding the new user to the data
        data[new_id] = {
            "name": user.name,
            "surname": user.surname,
            "username": user.username,
            "password": user.password,
        }
        return {"Sign-up": "COMPLETED"}

    except:
        # If there's an error, return sign-up error
        return {"Sign-up": "ERROR"}


# * Endpoint for deleting a user
@app.delete("/delete-user")
def delete_user(delete: Delete):
    # Checking if the provided username matches any user in the data
    for id, user in data.items():
        if user["username"] == delete.username:
            # if user is the test user, don't delete it
            if id == 0:
                break
            # If a match is found, delete the user
            del data[id]
            return {"Delete": "SUCCESS"}

    # If no match is found, return failed delete
    return {"Delete": "FAILED", "Info": "bad username"}


# * Endpoint for getting all data (just for test)
@app.get("/all-data")
def get_data():
    return data
