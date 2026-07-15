from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()


class LLM:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0
        )

    def get_llm(self):
        return self.llm
    

PROMPT = ChatPromptTemplate.from_template(
    """
You are an AI assistant that answers and page number or numbers(if many) questions using ONLY the provided context.

If the answer cannot be found in the context, say:
"I couldn't find the answer in the provided PDF."

Context:
{context}

Question:
{question}

Answer:
"""
)