from fastapi import FastAPI, Path, Request, HTTPException
from typing import Optional
from pydantic import BaseModel
import uvicorn

app = FastAPI()


class User(BaseModel):
    name: str
    surname: str
    username: str
    password: str


class Login(BaseModel):
    username: str
    password: str


data = {
    0: {
        "name": "Test",
        "surname": "Testic",
        "username": "test1991",
        "password": "test123",
    }
}


# * default home page -> status check
@app.get("/")
def get_item():
    return {"Status": "OK"}


@app.post("/log-in")
async def log_in(login: Login):
    for user in data.values():
        if user["username"] == login.username and user["password"] == login.password:
            return {"Log-in": "SUCCESS"}

    return {"Log-in": "FAILED", "Info": "bad credentials"}


@app.post("/sign-up")
async def sign_up(user: User):
    try:
        new_id = max(data.keys()) + 1
        data[new_id] = {
            "name": user.name,
            "surname": user.surname,
            "username": user.username,
            "password": user.password,
        }
        return {"Sign-up": "COMPLETED"}

    except:
        return {"Sign-up": "ERROR"}


# * receives GET to check all data stored (just for test)
@app.get("/all-data")
def get_data():
    return data
