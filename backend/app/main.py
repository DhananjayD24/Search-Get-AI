from services.pdf_loader import PDFLoader
from services.chunker import TextChunker
from services.embedding import EmbeddingModel
from services.vector_store import VectorStore


def main():

    # Load PDF
    loader = PDFLoader("sample.pdf")
    documents = loader.load()

    # Chunk PDF
    chunker = TextChunker()
    chunks = chunker.split(documents)

    # Load Embedding Model
    embedding_model = EmbeddingModel().get_model()

    # Create FAISS
    vector_store = VectorStore(embedding_model)
    db = vector_store.create_vector_store(chunks)

    question = input("Ask Question: ")

    results = vector_store.retrieve(question)

    print("\nRetrieved Chunks\n")

    for i, doc in enumerate(results, start=1):

        print(f"Chunk {i}")

        print("-"*60)

        print(doc.page_content)

        print("\nMetadata:", doc.metadata)

        print("="*60)


if __name__ == "__main__":
    main()