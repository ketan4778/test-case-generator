# Backend API SOP

## Goal
Provide a robust API to proxy requests between the Client UI and the local Ollama instance. It must handle prompt template injection and error management.

## Inputs
- `POST /api/generate`
  - Body: `{ "input": "string" }`

## Output
- JSON Response:
  - Success: `{ "response": "string" }`
  - Error: `{ "error": "string" }`

## Logic
1. Receive request.
2. Validate `input` is not empty.
3. Load the "Master Test Case Generator" prompt template.
4. Inject user input into the template.
5. Send request to Ollama (`http://localhost:11434/api/generate`).
   - Model: `llama3.2`
   - Stream: `false`
6. Return Ollama's response to the client.

## Edge Cases
- Ollama is down -> Return 502 Bad Gateway with clear message.
- User input is empty -> Return 400 Bad Request.
- Model not found -> Return 500 with "Model missing" message.
