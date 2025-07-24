from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
import os
import shutil
import json
from fastapi import Request
import time
import threading

analysis_results = {}  # In-memory store for simplicity

UPLOADS_DIR = "uploads"
os.makedirs(UPLOADS_DIR, exist_ok=True)

app = FastAPI()

# Allow CORS from your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:8000 "],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extract-resume/")
async def extract_resume(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    # Save the uploaded file temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    print(f"Saved temp file: {temp_path}")

    # Open and extract text from PDF
    try:
        doc = fitz.open(temp_path)
        full_text = ""
        for page in doc:
            full_text += page.get_text()
        doc.close()
        print(f"Extracted text from: {temp_path}")
    except Exception as e:
        print(f"Error extracting text: {e}")
        full_text = ""
    os.remove(temp_path)
    print(f"Removed temp file: {temp_path}")

    # Save extracted text as JSON in uploads directory
    json_filename = os.path.splitext(file.filename)[0] + ".json"
    json_path = os.path.join(UPLOADS_DIR, json_filename)
    try:
        with open(json_path, "w", encoding="utf-8") as json_file:
            json.dump({"raw_text": full_text}, json_file, ensure_ascii=False, indent=2)
        print(f"Saved JSON file: {json_path}")
    except Exception as e:
        print(f"Error saving JSON: {e}")

    # Return raw text (or you can parse it further)

    # Call an external API
    return {
        "raw_text": full_text,
        "json_file": json_filename
    }


@app.post("/analyze/")
async def analyze(request: Request):
    body = await request.json()
    file_name = body.get("file")

    def process():
        time.sleep(5)  # Simulate analysis delay
        file_path = os.path.join(UPLOADS_DIR, file_name)
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        raw_text = data["raw_text"]
        # Run your analysis here
        analysis_results[file_name] = {
            "progress": 100,
            "complete": True,
            "results": {
                "summary": "Example AI summary",
                "skills": ["Python", "FastAPI"],
            },
        }

    analysis_results[file_name] = {"progress": 0, "complete": False}
    threading.Thread(target=process).start()

    return {"message": "Analysis started", "file": file_name}

@app.get("/analyze/status")
async def check_status(file: str):
    return analysis_results.get(file, {"progress": 0, "complete": False})

