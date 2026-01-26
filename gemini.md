# Project Constitution

## Data Schemas

### 1. Generate Request (Client -> Server)
```json
{
  "input": "String (The user's code or description)"
}
```

### 2. Ollama Request (Server -> Ollama)
```json
{
  "model": "llama3.2",
  "prompt": "Template + User Input",
  "stream": false
}
```

### 3. Generate Response (Server -> Client)
```json
{
  "response": "String (Markdown formatted test cases)",
  "error": "String (Optional)"
}
```

## Behavioral Rules
- **Tone**: Professional, helpful, and code-focused.
- **Output**: Strict Markdown format. Code blocks must be properly tagged (e.g., ```python).
- **Template**: Always wrap user input in the "Master Test Case Generator" prompt template (to be defined).
- **Error Handling**: Gracefully handle Ollama connection failures (e.g., "Is Ollama running?").

## Architectural Invariants
- **Local First**: All processing happens locally via Ollama.
- **Separation of Concerns**: Frontend handles UI, Backend handles Prompt Engineering and API Proxy.
