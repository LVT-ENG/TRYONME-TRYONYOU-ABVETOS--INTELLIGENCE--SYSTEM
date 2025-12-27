
const express = require('express');
const path = require('path');
const app = require('./api/index.cjs');

const port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory (Frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing (for non-API routes)
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Hybrid Server listening at http://localhost:${port}`);
    console.log(`- Frontend: Serving ./dist`);
    console.log(`- Backend:  Serving /api/*`);
});
