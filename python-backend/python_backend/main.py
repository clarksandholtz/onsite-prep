from sqlmodel import SQLModel

from python_backend.app import app
from python_backend.db import engine
from python_backend.endpoints.decks import decks_router

SQLModel.metadata.create_all(engine)

app.include_router(decks_router)
