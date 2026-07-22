# Search & Get AI

Search & Get AI is a full-stack Retrieval-Augmented Generation (RAG) application for asking questions about a PDF. Upload one document, then receive concise, source-grounded answers with the supporting page numbers.

## Features

- Upload and preview PDF files in the browser.
- Ask natural-language questions about the uploaded document.
- Retrieve the three most relevant document chunks before generating an answer.
- Return a structured response containing the answer and supporting PDF pages.
- Show useful feedback for invalid PDFs, missing uploads, backend/API failures, and documents without readable text.
- Warm up the backend automatically when the landing page opens.

## How it works

```text
PDF upload
  -> PyPDFLoader
  -> Recursive text chunks (1,000 characters, 200 overlap)
  -> Jina Embeddings v3
  -> in-memory FAISS vector index
  -> top 3 matching chunks
  -> Groq / Llama 3.3 70B
  -> answer + supporting page numbers
```

The vector index exists only in backend memory. Uploading a new PDF replaces the previously indexed document, and restarting the backend clears it.

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, Axios, Lucide |
| Backend | FastAPI, Uvicorn, Pydantic |
| PDF and RAG | LangChain, PyPDFLoader, FAISS |
| Embeddings | Jina AI (`jina-embeddings-v3`) |
| LLM | Groq (`llama-3.3-70b-versatile`) |

## Prerequisites

- Node.js 20 or newer
- Python 3.11
- A [Jina AI API key](https://jina.ai/embeddings/)
- A [Groq API key](https://console.groq.com/)

## Setup

Clone the repository and configure the backend:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create `backend/.env`:

```env
JINA_API_KEY=your_jina_api_key
GROQ_API_KEY=your_groq_api_key
```

Start the API:

```powershell
uvicorn app.main:app --reload --port 8000
```

In another terminal, start the frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser. The frontend expects the backend at `http://localhost:8000/api` by default.

### Optional frontend environment variable

To point the frontend to a deployed or different backend, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com/api
```

Restart the Next.js development server after changing this value.

## API

All routes are prefixed with `/api`.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Returns `{"status": "ok"}`. |
| `POST` | `/api/upload` | Accepts one `multipart/form-data` field named `file`; it must be a PDF. Builds a new in-memory index. |
| `POST` | `/api/chat` | Accepts `{"question": "..."}` and answers from the most recently uploaded PDF. |

Example chat response:

```json
{
  "answer": "The document describes ...",
  "pages": [2, 4]
}
```

## Project structure

```text
SearchAndGet AI/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI application and CORS setup
│   │   ├── routers/chat.py          # Upload and chat endpoints
│   │   └── services/                # PDF loading, chunking, retrieval and LLM pipeline
│   └── requirements.txt
├── frontend/
│   ├── src/app/                     # Landing page and PDF workspace
│   ├── src/components/               # Upload, chat, preview and landing UI
│   └── src/services/                 # API, upload and chat clients
└── README.md
```

## Notes and limitations

- Only one PDF is available per running backend instance; there is no user account or document persistence.
- The app is designed for text-based PDFs. Scanned/image-only PDFs may not produce readable content.
- Answers are based on the top three retrieved chunks and are instructed to stay within 3–4 sentences.
- CORS currently permits all origins, which is convenient for development but should be restricted before production deployment.

## Available scripts

From `frontend/`:

```powershell
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Run the production server
npm run lint     # Run ESLint
```

## License

No license has been specified for this repository.
