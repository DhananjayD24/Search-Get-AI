from langchain_community.document_loaders import PyPDFLoader


class PDFLoader:
    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path

    def load(self):
        """
        Loads the PDF and returns a list of LangChain Document objects.
        """

        loader = PyPDFLoader(self.pdf_path)
        documents = loader.load()

        return documents