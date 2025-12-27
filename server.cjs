
const app = require('./api/index.cjs');
const port = 3000;

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
    console.log(`Test Endpoint: http://localhost:${port}/api/gemini`);
});
