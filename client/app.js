const generateBtn = document.getElementById('generate-btn');
const codeInput = document.getElementById('code-input');
const statusMsg = document.getElementById('status-msg');
const outputContainer = document.getElementById('output-container');
const resultOutput = document.getElementById('result-output');
const loader = generateBtn.querySelector('.loader');
const btnText = generateBtn.querySelector('.btn-text');
const copyBtn = document.getElementById('copy-btn');

const API_URL = window.location.protocol === 'file:' ? 'http://localhost:3001' : '';

generateBtn.addEventListener('click', async () => {
    const input = codeInput.value;

    if (!input.trim()) {
        showStatus('Please enter some code or requirements.', true);
        return;
    }

    const format = document.getElementById('format-select').value;
    
    // Reset UI
    startLoading();
    outputContainer.classList.add('hidden');
    resultOutput.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input, format })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Server error');
        }

        // Render Markdown
        resultOutput.innerHTML = marked.parse(data.response);
        hljs.highlightAll(); // Apply syntax highlighting
        outputContainer.classList.remove('hidden');
        showStatus('Test cases generated successfully!', false);

    } catch (error) {
        console.error(error);
        showStatus(`Error: ${error.message}`, true);
    } finally {
        stopLoading();
    }
});

copyBtn.addEventListener('click', () => {
    const textToCopy = resultOutput.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
            copyBtn.innerText = originalText;
        }, 2000);
    });
});


function startLoading() {
    generateBtn.disabled = true;
    loader.classList.remove('hidden');
    btnText.textContent = 'Generating (Model Loading...)...';
    statusMsg.textContent = 'First run may take ~30-60 seconds to load the model.';
}

function stopLoading() {
    generateBtn.disabled = false;
    loader.classList.add('hidden');
    btnText.textContent = 'Generate Tests';
}

function showStatus(msg, isError) {
    statusMsg.textContent = msg;
    if (isError) {
        statusMsg.classList.add('error-msg');
    } else {
        statusMsg.classList.remove('error-msg');
    }
}
