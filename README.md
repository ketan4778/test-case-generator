# Local AI Test Case Generator

A premium, privacy-focused tool that generates comprehensive functional test cases for your software requirements using a local LLM (Llama 3.2).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![Ollama](https://img.shields.io/badge/AI-Ollama-orange.svg)

## 🌟 Features

-   **Privacy First**: All data processing happens locally on your machine. No code leaves your system.
-   **Functional Test Cases**: Generates detailed manual test scenarios (Positive, Negative, Edge Cases).
-   **Multiple Formats**: Support for **Standard** (Step-by-Step) and **Gherkin** (Given-When-Then) syntax.
-   **Modern UI**: Glassmorphism-styled interface built with Vanilla JS and CSS variables.
-   **Real-time Generation**: Direct streaming integration with local Ollama instance.
-   **Syntax Highlighting**: Beautifully formatted output using Highlight.js.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1.  **[Node.js](https://nodejs.org/)** (v14 or higher)
2.  **[Git](https://git-scm.com/)**
3.  **[Ollama](https://ollama.com/)** (Required for the AI model)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ketan4778/test-case-generator.git
cd test-case-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Ollama (The AI Engine)
This tool uses the `llama3.2` model. You need to pull it locally:

```bash
ollama pull llama3.2
```

*Note: The model is approximately 2.0 GB. The first download might take a few minutes depending on your internet connection.*

## 🏃‍♂️ How to Run

### 1. Start the Backend Server
This handles the API requests and prompts.

```bash
node server/index.js
```

You should see: `Backend Server running on http://localhost:3000`

### 2. Open the Client
Navigate to the `client` folder and open `index.html` in your favorite browser.

**Option A (Direct File Open):**
Double-click `client/index.html` in your file explorer.

**Option B (VS Code Live Server):**
If using VS Code, right-click `client/index.html` and select "Open with Live Server".

## 📖 Usage Guide

1.  **Describe your Feature**: In the text area, paste your user story, requirements, or function description.
    *   *Example: "A login page that requires a valid email and password. It should lock the account after 5 failed attempts."*
2.  **Select Format**: Choose between **Standard** (for manual execution) or **Gherkin** (for BDD automated tests).
3.  **Generate**: Click the **Generate Tests** button.
    *   *Note: The very first generation might take ~60 seconds as the model loads into memory.*
3.  **View Results**: The AI will produce a structured list of test cases including Pre-conditions, Steps, and Expected Results.
4.  **Copy**: Use the Copy button to grab the Markdown for your documentation (Jira, Confluence, etc.).

## 🏗️ Tech Stack

-   **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
-   **Backend**: Node.js, Express.js
-   **AI Engine**: Ollama (Llama 3.2 model)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
