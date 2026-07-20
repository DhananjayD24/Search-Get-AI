import logging
import os
import tempfile
from functools import lru_cache

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.services.rag import RAGPipeline
from app.services.schema import ChatRequest, RAGResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@lru_cache
def get_rag() -> RAGPipeline:
    """Create the expensive embedding/LLM pipeline only when it is needed."""
    return RAGPipeline()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    print("upload request received")
    is_pdf = file.content_type == "application/pdf" or (file.filename or "").lower().endswith(".pdf")
    if not is_pdf:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please select a PDF file.")
    print("pdf validated")

    pdf_path: str | None = None
    try:
        contents = await file.read()
        if not contents:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The selected PDF is empty.")
        print(f"3. Read {len(contents)} bytes")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(contents)
            pdf_path = temp_file.name
            
        print("4. Temporary file created")
        
        get_rag().load_pdf(pdf_path)
        
        print("5. load_pdf finished")
        
        return {"message": "PDF uploaded successfully."}
    except HTTPException:
        raise
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(error)) from error
    except Exception as error:
        logger.exception("Could not process uploaded PDF")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process this PDF. Check the backend configuration and try another file.",
        ) from error
    finally:
        await file.close()
        if pdf_path and os.path.exists(pdf_path):
            os.remove(pdf_path)


@router.post("/chat", response_model=RAGResponse)
async def chat(request: ChatRequest):
    try:
        return get_rag().ask(request.question)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(error)) from error
    except Exception as error:
        logger.exception("Could not answer question")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The AI service is unavailable. Verify your backend API key and try again.",
        ) from error
