from fastapi import APIRouter

from python_backend.models.decks import Deck
from python_backend.queries import decks as decks_queries

decks_router = APIRouter()


@decks_router.get("/decks")
def all_decks() -> list[Deck]:
    return decks_queries.get_all_decks()
