from pydantic import BaseModel, Field


class RAGResponse(BaseModel):
    answer: str = Field(
        description="Answer to the user's question in at most 3-4 sentences."
    )

    pages: list[int] = Field(
        description="Page numbers from the provided context that support the answer."
    )