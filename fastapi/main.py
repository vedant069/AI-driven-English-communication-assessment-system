# main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from config.database import init_db
import logging
import conersa


logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add startup event handler
@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your new project!"}

@app.post("/process-audio") 
async def process_audio(file: UploadFile = File(...)):
    contents = await file.read()

    logging.info(f"Received file: {file.filename}")
    return {"filename": file.filename, "status": "received"}

app.include_router(users.router, prefix="/api/users", tags=["users"])