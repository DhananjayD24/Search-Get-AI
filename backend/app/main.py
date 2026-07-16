from services.retriever import Retriever
from services.pdf_loader import PDFLoader
from services.chunker import TextChunker
from services.embedding import EmbeddingModel
from services.vector_store import VectorStore
from services.formatter import ContextFormatter
from services.llm import LLM
from services.prompt import RAG_PROMPT


def main():

    # Load PDF
    loader = PDFLoader("sample.pdf")
    documents = loader.load()

    # Chunk PDF
    chunker = TextChunker()
    chunks = chunker.split(documents)

    # Load Embedding Model
    embedding_model = EmbeddingModel().get_model()

    # Create FAISS Vector Store
    vector_store = VectorStore(embedding_model)
    db = vector_store.create_vector_store(chunks)

    # Create Retriever
    retriever = Retriever(db)

    # Load LLM
    llm = LLM().get_llm()

    # Create LCEL Chain
    chain = RAG_PROMPT | llm

    while True:

        question = input("\nAsk Question (type 'exit' to quit): ")

        if question.lower() == "exit":
            break

        # Retrieve relevant chunks
        docs = retriever.retrieve(question)

        # Format retrieved context
        context = ContextFormatter.format(docs)

        # Invoke LLM
        response = chain.invoke(
            {
                "question": question,
                "context": context,
            }
        )

        print("\nAnswer:")
        print(response.answer)

        print("\nPages:")
        print(response.pages)
        print("-" * 60)


if __name__ == "__main__":
    main()