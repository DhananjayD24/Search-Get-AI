from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from services.schema import RAGResponse

load_dotenv()


class LLM:

    def __init__(self):

        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            groq_api_key=os.getenv("GROQ_API_KEY"),
            temperature=0,
        ).with_structured_output(RAGResponse)

    def get_llm(self):
        return self.llm