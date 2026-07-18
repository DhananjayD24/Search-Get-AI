from app.services.retriever import Retriever
from app.services.pdf_loader import PDFLoader
from app.services.chunker import TextChunker
from app.services.embedding import EmbeddingModel
from app.services.vector_store import VectorStore
from app.services.formatter import ContextFormatter
from app.services.llm import LLM
from app.services.prompt import RAG_PROMPT


class RAGPipeline:

    def __init__(self):

        self.embedding_model = EmbeddingModel().get_model()
        self.llm = LLM().get_llm()

        self.vector_store = None
        self.retriever = None

        self.chain = RAG_PROMPT | self.llm

    def load_pdf(self, pdf_path: str):

        # Load PDF
        loader = PDFLoader(pdf_path)
        documents = loader.load()
        if not documents:
            raise ValueError("This PDF has no readable pages.")

        # Chunk PDF
        chunker = TextChunker()
        chunks = chunker.split(documents)
        if not chunks:
            raise ValueError("No readable text was found in this PDF.")

        # Create Vector Store
        vector_store = VectorStore(self.embedding_model)
        db = vector_store.create_vector_store(chunks)

        # Create Retriever
        self.retriever = Retriever(db)

    def ask(self, question: str):

        if self.retriever is None:
            raise ValueError("Upload a PDF before asking a question.")

        # Retrieve relevant chunks
        docs = self.retriever.retrieve(question)

        # Format context
        context = ContextFormatter.format(docs)

        # Generate response
        response = self.chain.invoke(
            {
                "question": question,
                "context": context,
            }
        )

        return response
