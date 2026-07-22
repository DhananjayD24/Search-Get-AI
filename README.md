# Search & Get AI

Search & Get AI is a full-stack Retrieval-Augmented Generation (RAG) app for querying PDF documents. Upload a PDF, ask questions in natural language, and receive concise answers with the pages that support them.

## Features

- Upload and preview PDFs in the browser.
- Ask questions about the uploaded document.
- Retrieve the three most relevant document chunks per question.
- Return structured answers with supporting PDF page numbers.
- Validate invalid or unreadable PDFs and show API error feedback.

## How it works

```text
PDF upload
  -> PyPDFLoader
  -> Recursive text chunks (1,000 characters; 200 overlap)
  -> Jina Embeddings v3
  -> in-memory FAISS vector index
  -> top 3 relevant chunks
  -> Groq / Llama 3.3 70B
  -> answer + supporting page numbers
```

The vector index is stored only in backend memory. Uploading a new PDF replaces the previous document, and restarting the backend clears it.

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, Axios, Lucide |
| Backend | FastAPI, Uvicorn, Pydantic |
| RAG | LangChain, PyPDFLoader, FAISS |
| Embeddings | Jina AI (`jina-embeddings-v3`) |
| LLM | Groq (`llama-3.3-70b-versatile`) |

## Prerequisites

- Node.js 20+
- Python 3.11
- A [Jina AI API key](https://jina.ai/embeddings/)
- A [Groq API key](https://console.groq.com/)

## Setup

Set up and start the backend:

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

```powershell
uvicorn app.main:app --reload --port 8000
```

In another terminal, start the frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. By default, the frontend uses `http://localhost:8000/api` as its backend URL.

To use a different API, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com/api
```

## API

All routes are prefixed with `/api`.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Returns `{"status": "ok"}`. |
| `POST` | `/api/upload` | Accepts a `multipart/form-data` field named `file`; processes a PDF and builds a new index. |
| `POST` | `/api/chat` | Accepts `{"question": "..."}` and queries the most recently uploaded PDF. |

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
│   │   ├── main.py                 # FastAPI application
│   │   ├── routers/chat.py          # Upload and chat endpoints
│   │   └── services/                # RAG pipeline components
│   └── requirements.txt
├── frontend/
│   ├── src/app/                     # Landing page and PDF workspace
│   ├── src/components/               # UI components
│   └── src/services/                 # API clients
└── README.md
```

## Notes

- The app handles one PDF per running backend instance; there is no account system or persistence.
- Text-based PDFs work best. Scanned/image-only PDFs may not contain extractable text.
- The model is instructed to answer from retrieved context in 3–4 sentences.
- CORS currently allows all origins and should be restricted for production.

## Frontend scripts

Run these from `frontend/`:

```powershell
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## License

No license has been specified for this repository.
