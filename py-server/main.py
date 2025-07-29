from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
import os
import shutil
import json
from fastapi import Request
import time
import threading
import cohere
import re
from fastapi.responses import HTMLResponse

# filepath: c:\Users\Asus\Desktop\spellMyJob\py-server\main.py
from dotenv import load_dotenv
load_dotenv()
# ...existing code...


analysis_results = {}  # In-memory store for simplicity

UPLOADS_DIR = "uploads"
os.makedirs(UPLOADS_DIR, exist_ok=True)

app = FastAPI()

# Allow CORS from your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:8000 ", "https://spell-my-job-delta.vercel.app"],  # Update with your frontend URL
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
        print(f"[ANALYSIS] Starting analysis for {file_name}")
        file_path = os.path.join(UPLOADS_DIR, file_name)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            raw_text = data["raw_text"]

            system_prompt = '''
                You are a resume analysis assistant. Given a resume, return ONLY a valid JSON object with these fields:
                {
                "overallScore": int,
                "strengths": [str, ...],
                "improvements": [str, ...]
                }
                DO NOT include any explanation, markdown, or text outside the JSON object. Return ONLY the JSON object. If you cannot provide a value, use 0 for numbers and [] for lists.
            '''

            co = cohere.Client(os.getenv("COHERE_API_KEY"))
            try:
                response = co.chat(
                    message=raw_text,
                    preamble=system_prompt
                )
                ai_result = response.text
                print(f"[ANALYSIS] Raw AI response for {file_name}: {ai_result}")
                # Remove markdown code block if present
                ai_result_clean = re.sub(r"^```json|^```|```$", "", ai_result, flags=re.MULTILINE).strip()
                try:
                    parsed = json.loads(ai_result_clean)
                except Exception:
                    # Fallback: minimal valid object for frontend
                    parsed = {
                        "overallScore": 0,
                        "strengths": [],
                        "improvements": [],
                        "error": "AI response could not be parsed"
                    }
                # Fill in missing fields with defaults
                for key, default in [
                    ("overallScore", 0),
                    ("strengths", []),
                    ("improvements", [])
                ]:
                    if key not in parsed:
                        parsed[key] = default
                print(f"[ANALYSIS] Analysis complete for {file_name}")
            except Exception as e:
                parsed = {
                    "overallScore": 0,
                    "strengths": [],
                    "improvements": [],
                    "error": str(e)
                }
                print(f"[ANALYSIS] Error during AI call for {file_name}: {e}")
        except Exception as e:
            parsed = {
                "overallScore": 0,
                "strengths": [],
                "improvements": [],
                "error": f"File or JSON error: {e}"
            }
            print(f"[ANALYSIS] Error loading file or JSON for {file_name}: {e}")

        analysis_results[file_name] = {
            "progress": 100,
            "complete": True,
            "results": parsed,
        }
        print(f"[ANALYSIS] analysis_results set for {file_name}")

    analysis_results[file_name] = {"progress": 0, "complete": False}
    threading.Thread(target=process).start()

    return {"message": "Analysis started", "file": file_name}

@app.get("/analyze/status")
async def check_status(file: str):
    return analysis_results.get(file, {"progress": 0, "complete": False})

@app.get("/", response_class=HTMLResponse)
def homepage():
    return """
    <html>
        <head><title>SpellMyJob API</title></head>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>👋 Welcome to SpellMyJob API</h1>
            <p>This is the backend service. </p>
        </body>
    </html>
    """