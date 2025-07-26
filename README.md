# SpellMyJob - AI-Powered Resume Analysis Platform


[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)

## 📋 Overview

SpellMyJob is a comprehensive AI-powered resume analysis platform that helps job seekers optimize their resumes for better job matching and ATS (Applicant Tracking System) compatibility. The platform combines modern web technologies with AI analysis to provide actionable insights for resume improvement.

## ✨ Features

### 🎯 Core Features
- **Resume Upload & Processing**: Support for PDF, DOC, and DOCX files
- **AI-Powered Analysis**: Intelligent resume analysis using Cohere AI
- **Section-wise Extraction**: Automatic parsing of resume sections
- **ATS Compatibility Scoring**: Evaluate resume compatibility with ATS systems
- **Keyword Optimization**: Identify missing keywords for target roles
- **Job Matching**: Match resumes with relevant job opportunities
- **Real-time Progress Tracking**: Monitor analysis progress in real-time

### 🛠 Technical Features
- **Modern UI/UX**: Built with Next.js 15 and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Real-time Updates**: WebSocket-like progress tracking
- **File Management**: Automatic file processing and storage
- **API-First Architecture**: RESTful API with FastAPI backend
- **CORS Support**: Cross-origin resource sharing enabled

## 🏗 Architecture

### Frontend (Next.js)
```
spellMyJob-z9-main/
├── app/                    # Next.js 15 App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main application pages
│   │   ├── upload/        # Resume upload interface
│   │   └── analyze/       # Analysis results display
│   └── api/               # API routes
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── lib/                  # Utility functions and configurations
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

### Backend (FastAPI)
```
py-server/
├── main.py               # FastAPI application with endpoints
├── requirements.txt      # Python dependencies
├── uploads/              # Processed resume files storage
└── start.sh              # Server startup script
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Cohere API key (for AI analysis)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spellMyJob/spellMyJob-z9-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd py-server
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the `py-server` directory:
   ```env
   COHERE_API_KEY=your_cohere_api_key_here
   ```

5. **Start the backend server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   # or use the provided script
   ./start.sh
   ```

6. **Verify backend is running**
   Navigate to [http://localhost:8000](http://localhost:8000)

## 📚 API Documentation

### Endpoints

#### `POST /extract-resume/`
Extracts text from uploaded resume files.

**Request:**
- Content-Type: `multipart/form-data`
- Body: File upload with key `file`

**Response:**
```json
{
  "raw_text": "extracted text content",
  "json_file": "filename.json"
}
```

#### `POST /analyze/`
Initiates AI analysis of a processed resume.

**Request:**
```json
{
  "file": "filename.json"
}
```

**Response:**
```json
{
  "message": "Analysis started",
  "file": "filename.json"
}
```

#### `GET /analyze/status?file={filename}`
Checks the status of an ongoing analysis.

**Response:**
```json
{
  "progress": 100,
  "complete": true,
  "results": {
    "overallScore": 85,
    "strengths": ["Strong technical skills", "Clear experience"],
    "improvements": ["Add more keywords", "Optimize formatting"]
  }
}
```

#### `GET /`
Homepage with API information.

## 🎨 UI Components

The application uses a comprehensive set of UI components built with:
- **Shadcn/ui**: Modern, accessible component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Radix UI**: Headless UI primitives

### Key Components
- **Upload Interface**: Drag-and-drop file upload with progress tracking
- **Analysis Dashboard**: Real-time analysis results with interactive charts
- **Progress Indicators**: Visual feedback for long-running operations
- **Responsive Cards**: Information display with consistent styling

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
COHERE_API_KEY=your_cohere_api_key_here
```

#### Frontend (next.config.mjs)
- CORS configuration for backend communication
- API endpoint configuration

### File Upload Settings
- **Supported Formats**: PDF, DOC, DOCX
- **Maximum Size**: 10MB
- **Storage**: Local file system (uploads directory)

## 🚀 Deployment

### Frontend (Vercel)
The frontend is automatically deployed on Vercel and stays in sync with v0.dev deployments.

### Backend
The backend can be deployed on any platform supporting Python:
- **Railway**: Easy deployment with automatic scaling
- **Heroku**: Traditional platform with good Python support
- **DigitalOcean**: VPS deployment with full control
- **AWS/GCP**: Cloud platform deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **v0.dev**: For the initial project structure and UI components
- **Cohere**: For AI-powered text analysis capabilities
- **PyMuPDF**: For robust PDF text extraction
- **FastAPI**: For high-performance API development
- **Next.js**: For the modern React framework

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the API documentation at `http://localhost:8000/docs` when running locally

---

**Built with ❤️ using modern web technologies** 