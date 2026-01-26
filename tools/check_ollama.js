const http = require('http');

const options = {
  hostname: 'localhost',
  port: 11434,
  path: '/api/tags',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
    if (res.statusCode === 200) {
      console.log('SUCCESS: Ollama is running and reachable.');
    } else {
      console.log('FAILURE: Ollama returned non-200 status.');
    }
  });
});

req.on('error', (e) => {
  console.error(`PROBLEM: ${e.message}`);
  console.log('FAILURE: Could not connect to Ollama. Is it running?');
});

req.end();
