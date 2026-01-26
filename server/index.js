const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { buildPrompt } = require('./prompt');

const app = express();
const PORT = 3000;
const OLLAMA_PORT = 11434;

app.use(cors());
app.use(bodyParser.json());

// API Endpoint: Generate Test Cases
app.post('/api/generate', (req, res) => {
    const { input } = req.body;

    // 1. Validate Input
    console.log('Received request:', req.body); // DEBUG LOG

    if (!input || typeof input !== 'string' || input.trim() === '') {
        console.error('Invalid input received');
        return res.status(400).json({ error: 'Invalid input. Please provide code or requirements.' });
    }

    // 2. Build Prompt
    const finalPrompt = buildPrompt(input);
    console.log('Prompt built. Sending to Ollama...'); // DEBUG LOG

    // 3. Prepare Request to Ollama
    const requestData = JSON.stringify({
        model: 'llama3.2',
        prompt: finalPrompt,
        stream: false
    });

    const options = {
        hostname: 'localhost',
        port: OLLAMA_PORT,
        path: '/api/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestData)
        }
    };

    // 4. Send Request to Ollama
    const ollamaReq = http.request(options, (ollamaRes) => {
        let data = '';

        ollamaRes.on('data', (chunk) => {
            data += chunk;
        });

        ollamaRes.on('end', () => {
            console.log('Ollama response ended. Status:', ollamaRes.statusCode); // DEBUG LOG
            if (ollamaRes.statusCode === 200) {
                try {
                    const jsonResponse = JSON.parse(data);
                    // 5. Return Success Response
                    res.json({ response: jsonResponse.response });
                } catch (e) {
                    console.error('Error parsing Ollama response:', e);
                    res.status(500).json({ error: 'Failed to process AI response.' });
                }
            } else if (ollamaRes.statusCode === 404) {
                res.status(500).json({ error: 'Model "llama3.2" not found. Please run "ollama pull llama3.2".' });
            } else {
                console.error(`Ollama Error: Status ${ollamaRes.statusCode}, Body: ${data}`);
                res.status(502).json({ error: 'Ollama is running but returned an error.' });
            }
        });
    });

    ollamaReq.on('error', (e) => {
        console.error(`Ollama Connection Error: ${e.message}`);
        console.error('Stack:', e.stack);
        // 6. Handle Connection Error
        res.status(502).json({ error: 'Could not connect to Ollama. Is it running on port 11434?' });
    });

    ollamaReq.write(requestData);
    ollamaReq.end();
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});
