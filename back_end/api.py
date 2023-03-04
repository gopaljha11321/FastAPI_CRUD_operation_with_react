from fastapi import FastAPI as api
from pydantic import BaseModel
from pymongo import MongoClient
import asyncio
from fastapi.middleware.cors import CORSMiddleware
app =api()
origins = [
    "http://localhost:3000",
    "http://localhost:3030"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   
url="mongodb+srv://gopal:jhaji9871436400@cluster0.it4owmc.mongodb.net/?retryWrites=true&w=majority"
my_client = MongoClient(url)
dbname = my_client["project_ai"]
collection=dbname["user"]


class Login(BaseModel):
    email:str
    password:str

class Register(BaseModel):
    email:str
    password:str
    name:str

class Update(BaseModel):
    email:str
    newpassword:str
    oldpassword:str

class Reset(BaseModel):
    email:str

@app.get("/")
async def test():
    return "test_api"

@app.post("/login")
async def login(data:Login):
    email=data.email
    password=data.password
    a=collection.find({"email":email})
    for i in a:
        if(i["password"]==password):
            res_data={
                "res_code":1,
                "id":i["_id"]
            }
            return res_data
        else:
            res_data={
                "res_code":0,
                "error":"Please enter correct password"
            }
            return res_data
    res_data={
        "res_code":0,
        "error":"Access is denied."
        }
    
    return res_data


@app.post("/register")
async def register(data: Register):
    name=data.name
    email=data.email
    password=data.password
    a=collection.find({"email":email})
    for i in a:
        print("hello")
        if(i["email"]==email):
            return "Email already in use"
    print("hii")
    dic={
        "name":name,
        "email":email,
        "password":password,
        }
    collection.insert_one(dic)
    return "data added"
            
@app.put("/update")
async def update(data:Update):
    email=data.email
    oldPassword=data.oldpassword
    newPassword=data.newpassword
    user=collection.find({"email":email,"password":oldPassword})
    for i in user:
        if(i["email"]==email):
            collection.update_one({"email":email},{"$set":{"email":email,"password":newPassword}})
            return "Data updated successfully"
    return "Wrong user id and password"

@app.post("/reset")
async def reset(data:Reset):
    email=data.email
    user=collection.find({"email":email})
    for i in user:
        if(i["email"]==email):
            return "Our team will contact you within 24 hours"
    return "Wrong user id"

@app.get("/delete_user")
async def delete_user(email:str):
    user=collection.find({"email":email})
    for i in user :
        if(i["email"]==email):
            collection.delete_one({"email":email})
        return "data deleted"
    return "Wrong user id"

