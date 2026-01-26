# Findings

## Research
- Utilizing Ollama for local LLM based testcase generation.
- Standard Ollama API port: 11434.
- Library: `ollama` (Python) or direct REST API (Node/JS).

## Discovered Constraints
- **Model**: Llama 3.2 (Must be pulled locally).
- **CORS**: Direct browser calls to Ollama might fail if CORS isn't configured on Ollama. Using a Node proxy is safer.

## Key Decisions
- **Stack**: Vanilla JS Frontend + Node.js Backend.
- **Template Strategies**: Store prompt template in a dedicated file/module for easy creating/editing.
