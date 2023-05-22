from fastapi import FastAPI;
from fastapi.staticfiles import StaticFiles
from app.routes.router import router as appRoutes;
from fastapi.middleware.cors import CORSMiddleware
from app.server.database import create_tables

create_tables()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return "Welcome to keynow backend"

app.include_router(appRoutes,prefix='/api')
