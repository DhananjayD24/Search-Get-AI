from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import tempfile

from app.services.rag import RAGPipeline
from app.services.schema import RAGResponse, ChatRequest

router = APIRouter()

rag = RAGPipeline()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        contents = await file.read()

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(contents)
            temp_file.flush()
            pdf_path = temp_file.name
            pdf_path = temp_file.name
            
        try:
            rag.load_pdf(pdf_path)
        finally:
             os.remove(pdf_path)

        return {
            "message": "PDF uploaded successfully."
        }


@router.post(
    "/chat",
    response_model=RAGResponse
)
async def chat(request: ChatRequest):

    return rag.ask(request.question)

