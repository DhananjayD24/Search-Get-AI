import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from h11 import Request

from app.routers.chat import router

load_dotenv()

app = FastAPI(
    title="Search & Get AI",
    version="1.0.0",
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def debug_requests(request: Request, call_next):
    print(f"REQUEST: {request.method} {request.url.path}")
    response = await call_next(request)
    print(f"RESPONSE: {response.status_code}")
    return response

app.include_router(router, prefix="/api", tags=["Chat"])