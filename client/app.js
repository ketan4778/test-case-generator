const generateBtn = document.getElementById('generate-btn');
const codeInput = document.getElementById('code-input');
const statusMsg = document.getElementById('status-msg');
const outputContainer = document.getElementById('output-container');
const resultOutput = document.getElementById('result-output');
const loader = generateBtn.querySelector('.loader');
const btnText = generateBtn.querySelector('.btn-text');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');

let lastGeneratedMarkdown = '';
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

        lastGeneratedMarkdown = data.response;
        downloadBtn.disabled = false;

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

downloadBtn.addEventListener('click', () => {
    if (!lastGeneratedMarkdown.trim()) {
        showStatus('Generate test cases before downloading.', true);
        return;
    }

    const rows = parseTestCasesToRows(lastGeneratedMarkdown);
    const csv = buildCsv(rows);
    const filename = `test-cases-${new Date().toISOString().slice(0, 10)}.csv`;
    downloadFile(csv, filename);
});

function parseTestCasesToRows(markdown) {
    const normalized = markdown.replace(/\r\n/g, '\n').trim();
    const blocks = splitIntoBlocks(normalized);
    const rows = blocks.map((block, index) => {
        const parsed = parseBlockFields(block);
        return {
            id: parsed.id || `TC-${index + 1}`,
            title: parsed.title || '',
            preconditions: parsed.preconditions || '',
            steps: parsed.steps || '',
            expected: parsed.expected || '',
            raw: parsed.raw.replace(/\n{2,}/g, '\n').trim()
        };
    });

    if (rows.length === 0) {
        rows.push({ id: 'TC-1', title: '', preconditions: '', steps: '', expected: '', raw: normalized });
    }

    return rows;
}

function splitIntoBlocks(markdown) {
    const lines = markdown.split('\n');
    const blocks = [];
    let current = [];

    const separatorRegex = /^(Test Case ID|Test Case|Scenario|#{2,})\b/i;

    lines.forEach((line) => {
        if (separatorRegex.test(line) && current.length > 0) {
            blocks.push(current.join('\n').trim());
            current = [];
        }
        current.push(line);
    });

    if (current.length > 0) {
        blocks.push(current.join('\n').trim());
    }

    return blocks.filter((block) => block.length > 0);
}

function parseBlockFields(block) {
    const lines = block.split('\n');
    const data = { id: '', title: '', preconditions: '', steps: '', expected: '', raw: block };
    let currentField = null;

    const fieldMap = {
        'test case id': 'id',
        'id': 'id',
        'title': 'title',
        'pre-conditions': 'preconditions',
        'preconditions': 'preconditions',
        'steps': 'steps',
        'expected result': 'expected',
        'expected results': 'expected',
        'scenario': 'title',
        'given': 'steps',
        'when': 'steps',
        'then': 'steps'
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        const headingMatch = trimmed.match(/^(Test Case ID|ID|Title|Pre[- ]conditions|Preconditions|Steps|Expected Result[s]?|Scenario|Given|When|Then):\s*(.*)$/i);

        if (headingMatch) {
            const key = headingMatch[1].toLowerCase();
            currentField = fieldMap[key] || null;
            const value = headingMatch[2].trim();
            if (currentField && value) {
                data[currentField] = data[currentField]
                    ? `${data[currentField]}\n${value}`
                    : value;
            }
            return;
        }

        if (currentField) {
            if (trimmed === '') {
                return;
            }
            data[currentField] = data[currentField]
                ? `${data[currentField]}\n${trimmed}`
                : trimmed;
        } else if (index === 0 && !data.id && !headingMatch) {
            data.raw = data.raw;
        }
    });

    if (!data.id && lines[0] && !lines[0].includes(':')) {
        data.id = lines[0].trim();
    }

    return data;
}

function buildCsv(rows) {
    const header = ['Test Case ID', 'Title', 'Pre-conditions', 'Steps', 'Expected Result', 'Raw Text'];
    const csvRows = [header.join(',')];

    rows.forEach((row) => {
        csvRows.push([
            escapeCsv(row.id),
            escapeCsv(row.title),
            escapeCsv(row.preconditions),
            escapeCsv(row.steps),
            escapeCsv(row.expected),
            escapeCsv(row.raw)
        ].join(','));
    });

    return csvRows.join('\r\n');
}

function escapeCsv(value) {
    const escaped = String(value || '').replace(/"/g, '""');
    if (/[,\n"\r]/.test(escaped)) {
        return `"${escaped}"`;
    }
    return escaped;
}

function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

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
