# * Importing necessary modules from FastAPI, typing and pydantic
from fastapi import FastAPI, Path, Request
from starlette.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel

# * Imports for storing and handling data
from cryptography.fernet import Fernet, InvalidToken
from dotenv import load_dotenv
import json
import os

# * Getting the key for data encryption
load_dotenv()

key = os.getenv("ENCRYPTION_KEY")
if key is None:
    print("ERROR - No key")
else:
    key = key.encode()

cipher_suite = Fernet(key)


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
class User(BaseModel):
    fullname: str  # User's full name
    email: str  # User's last name
    username: str  # User's username
    password: str  # User's password


# * Login class definition with BaseModel
class SignIn(BaseModel):
    username: str  # Username for login
    password: str  # Password for login


# * Update class definition with BaseModel
class Update(BaseModel):
    username: str  # Username for identification
    new_email: Optional[str] = None  # New email for change
    new_password: Optional[str] = None  # New password to change
    new_fullname: Optional[str] = None  # New fullname to change


# * Delete class definition with BaseModel
class Delete(BaseModel):
    username: str  # Username to delate


# * Main dictionary used for temporary storage
data = {}


# * Default home page -> status check
@app.get("/")
def get_item():
    return {"Status": "OK"}


# * Endpoint for signing in
@app.post("/sign-in")
def sign_in(sign_in: SignIn):
    try:
        # Flag for existing username, used to be more precise in fail description
        username_flag = False
        # Checking if the provided credentials match any user in the data
        for user in data.values():
            username_flag = user["username"] == sign_in.username

            if username_flag and user["password"] == sign_in.password:
                return {"Log-in": "SUCCESS"}

        # If no match is found, return failed log-in depending on scenario
        if username_flag:
            return {"Log-in": "FAILED", "Info": "wrong password"}
        else:
            return {"Log-in": "FAILED", "Info": "username doesn't exist"}

    except Exception as e:
        # prints the error out
        print({"Sign-in ERROR": f"{e}"})
        # If there's an error, return sign-in error to front
        return {"Sign-in": "ERROR"}


# * Endpoint for signing up
@app.post("/sign-up")
def sign_up(user: User):
    try:
        # Checking if the username already exists
        if check_username(user.username):
            return {"Sign-up": "ERROR", "info": "username already exists"}

        # Creating a new ID for the user
        new_id = str(int(max(data.keys())) + 1)
        # Adding the new user to the data
        data[new_id] = {
            "fullname": user.fullname,
            "email": user.email,
            "username": user.username,
            "password": user.password,
            "admin_of": {},
        }

        # Save the changed data to the database
        save_data(data)

        # Return success
        return {"Sign-up": "COMPLETED"}

    except Exception as e:
        # prints the error out
        print({"Sign-up ERROR": f"{e}"})
        # If there's an error, return sign-up error to front
        return {"Sign-up": "ERROR"}


# * Endpoint for updating user's info
@app.put("/update-user")
def update_user(update: Update):
    try:
        # Checking if the user with given username exists
        if not check_username(update.username):
            return {"Update": "ERROR", "info": "user with given username doesn't exist"}

        # Find data (subdict) for user with given username
        id, user = next(
            (id, user)
            for id, user in data.items()
            if user["username"] == update.username
        )

        # Don't allow change for test user
        if id == "0":
            return {"Update": "FAILED", "Info": "cannot change info for this user"}

        # Replace data if given any (stays the same if new data is None)
        user["fullname"] = update.new_fullname or user["fullname"]
        user["email"] = update.new_email or user["email"]
        user["password"] = update.new_password or user["password"]

        # Save the changed data to the database
        save_data(data)

        # Return success
        return {"Update": "SUCCESS"}

    except Exception as e:
        # prints the error out
        print({"Update ERROR": f"{e}"})
        # If there's an error, return update error to front
        return {"Update": "ERROR"}


# * Endpoint for deleting a user
@app.delete("/delete-user")
def delete_user(delete: Delete):
    try:
        # Checking if the provided username matches any user in the data
        for id, user in data.items():
            if user["username"] == delete.username:
                # if user is the test user, don't delete it
                if id == "0":
                    break
                # If a match is found, delete the user
                del data[id]

                # Save the changed data to the database
                save_data(data)

                # Return success
                return {"Delete": "SUCCESS"}

        # If no match is found, return failed delete
        return {"Delete": "FAILED", "Info": "bad username"}

    # Print out the issue and return error to front
    except Exception as e:
        # prints the error out
        print({"Delete ERROR": f"{e}"})
        # If there's an error, return delete error to front
        return {"Delete": "ERROR"}


# * Endpoint for getting user info
@app.get("/user-info")
def get_info(username: str):
    try:
        # Load the newest data
        data = load_data("user_data")

        # Checking if the provided username matches any user in the data
        for user in data.values():
            if user["username"] == username:
                # Copy the user data and remove the password
                user_data = user.copy()
                user_data.pop("password", None)
                # Return users data
                return Response(
                    content=json.dumps(user_data, indent=4),
                    media_type="application/json",
                )

        # If no match is found, return failed getting info
        return {"Get Info": "FAILED", "Info": "bad username"}

    # Print out the issue and return error to front
    except Exception as e:
        # prints the error out
        print({"Get Info ERROR": f"{e}"})
        # If there's an error, return delete error to front
        return {"Get_info": "ERROR"}


# * Endpoint for getting all data (just for test)
@app.get("/all-data")
def get_data(passcode: Optional[str] = None):
    correct_passcode = "secret123"

    # Load the newest data
    data = load_data("user_data")

    # Check if the provided passcode is correct
    if passcode == correct_passcode:
        return Response(
            content=json.dumps(data, indent=4), media_type="application/json"
        )
    else:
        return {"GET DATA": "ERROR", "Info": "Bad passcode"}


@app.on_event("shutdown")
def save_data_on_shutdown():
    save_data(data)


@app.on_event("startup")
def load_data_on_startup():
    global data
    data = load_data()


#! ------------------------- network unrelated functions


# * Function takes in a username, returns True if it exists in DB
def check_username(username: str):
    # Loop through all users, check for match
    for user in data.values():
        if user["username"] == username:
            return True

    # If theres no match return false
    return False


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
