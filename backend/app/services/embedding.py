# from langchain_huggingface import HuggingFaceEmbeddings


# class EmbeddingModel:
#     def __init__(self):
#         self.embedding = HuggingFaceEmbeddings(
#             model_name="BAAI/bge-small-en-v1.5"
#         )

#     def get_model(self):
#         return self.embedding

import os
import requests

from dotenv import load_dotenv
from langchain_core.embeddings import Embeddings

load_dotenv()


class JinaEmbeddings(Embeddings):

    def __init__(self):
        self.api_key = os.getenv("JINA_API_KEY")

        if not self.api_key:
            raise ValueError("JINA_API_KEY not found.")

        self.url = "https://api.jina.ai/v1/embeddings"

        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def embed_documents(self, texts: list[str]) -> list[list[float]]:

        response = requests.post(
            self.url,
            headers=self.headers,
            json={
                "model": "jina-embeddings-v3",
                "input": texts,
            },
            timeout=60,
        )

        response.raise_for_status()

        result = response.json()

        return [item["embedding"] for item in result["data"]]

    def embed_query(self, text: str) -> list[float]:

        return self.embed_documents([text])[0]


class EmbeddingModel:

    def __init__(self):
        self.embedding = JinaEmbeddings()

    def get_model(self):
        return self.embedding