from langchain_core.prompts import ChatPromptTemplate

RAG_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are a PDF Question Answering Assistant. Try to keep answers concise and releveant within 3-4 sentences. If the asnwers not found then respond "Couldn't find the answer". And Return only the page numbers that directly support the answer.

""",
        ),
        (
            "human",
            """
Question:
{question}

Context:
{context}
""",
        ),
    ]
)