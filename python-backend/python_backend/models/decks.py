from typing import Optional

from sqlmodel import SQLModel, Field


class Deck(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str]
    cover_image_url: Optional[str]
