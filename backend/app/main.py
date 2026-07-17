from fastapi import FastAPI
from app.routers.chat import router

app = FastAPI(
    title="Search & Get AI",
    version="1.0.0",
)

app.include_router(router, prefix="/api", tags=["Chat"])