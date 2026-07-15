from langchain_huggingface import HuggingFaceEmbeddings


class EmbeddingModel:
    def __init__(self):
        self.embedding = HuggingFaceEmbeddings(
            model_name="BAAI/bge-small-en-v1.5"
        )

    def get_model(self):
        return self.embedding