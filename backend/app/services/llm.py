from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from app.services.schema import RAGResponse

load_dotenv()


class LLM:

    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY is missing from backend/.env.")

        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            groq_api_key=api_key,
            temperature=0,
        ).with_structured_output(RAGResponse)

    def get_llm(self):
        return self.llm
