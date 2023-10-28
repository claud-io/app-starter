import random
from typing import Annotated
from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/me")
def me():
    return {"id": 1, "name": "banana", "surname": "banana as well", "email": "banana@banana.com" }

@app.post("/login")
def login(item: dict):
    if item['username'] == "ba" and item['password'] == "nana":
        return{
            "access_token": f"access_token_{random.randint(0, 200)}",
            "refresh_token": f"refresh_token_{random.randint(0, 200)}"
        }

@app.get("/refresh")
def refresh():
    return{
        "access_token": f"access_token_{random.randint(0, 200)}",
        "refresh_token": f"refresh_token_{random.randint(0, 200)}"
    }



