from sqlmodel import Session, select

from python_backend.db import engine
from python_backend.models.decks import Deck


def get_all_decks() -> list[Deck]:
    session = Session(engine)
    statement = select(Deck)
    results = session.exec(statement)
    return list(results)
