# Task Plan

## Blueprint: Local LLM Test Case Generator

### Vision
A premium, chat-based UI that allows users to input code or requirements and receive generated test cases using a local Ollama (Llama 3.2) instance. The system will utilize a predefined prompt template stored in the codebase to ensure high-quality output.

### Architecture
- **Frontend**: Vanilla HTML/CSS/JS (Modern, responsive, "Glassmorphism" design).
- **Backend**: Node.js (Express) to handle API requests, manage the Prompt Template, and proxy calls to the local Ollama instance (to handle CORS and centralize logic).
- **Integrations**: Local Ollama API (http://localhost:11434).

## Phases
- [/] Phase 1: Initialization & Discovery (Complete)
- [x] Phase 2: Architecture & Design (Schema & Server Setup)
- [x] Phase 3: Implementation (Frontend & Backend)
- [x] Phase 4: Testing & Optimization (Complete)

## Checklist
- [ ] Create `gemini.md` Data Schemas
- [ ] Setup Node.js Project (`package.json`)
- [ ] Create Backend Server (`server.js`) with Ollama Proxy
- [ ] Create Prompt Template Module
- [ ] Build Frontend (`index.html`, `style.css`, `app.js`)
- [ ] Verify End-to-End Flow
