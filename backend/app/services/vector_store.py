from langchain_community.vectorstores import FAISS


class VectorStore:
    def __init__(self, embedding_model):
        self.embedding_model = embedding_model
        self.vector_store = None

    def create_vector_store(self, chunks):
        """
        Creates an in-memory FAISS index from document chunks.
        """
        self.vector_store = FAISS.from_documents(
            documents=chunks,
            embedding=self.embedding_model
        )

        return self.vector_store

    def get_vector_store(self):
        return self.vector_store
    
    def retrieve(self, question, k=3):
        """
        Retrieves the top-k most relevant chunks.
        """

        return self.vector_store.similarity_search(
            query=question,
            k=k
        )