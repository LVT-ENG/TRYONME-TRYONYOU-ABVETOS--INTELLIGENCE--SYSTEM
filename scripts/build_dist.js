const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const assetsDir = path.join(__dirname, '..', 'assets');
const indexFile = path.join(__dirname, '..', 'index.html');

// Clean dist
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// Copy index.html
if (fs.existsSync(indexFile)) {
    fs.copyFileSync(indexFile, path.join(distDir, 'index.html'));
    console.log('Copied index.html');
} else {
    console.error('index.html not found!');
    process.exit(1);
}

// Copy assets
function copyRecursive(src, dest) {
    if (fs.existsSync(src)) {
        const stats = fs.statSync(src);
        if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            fs.readdirSync(src).forEach(child => {
                copyRecursive(path.join(src, child), path.join(dest, child));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    }
}

if (fs.existsSync(assetsDir)) {
    copyRecursive(assetsDir, path.join(distDir, 'assets'));
    console.log('Copied assets');
} else {
    console.log('No assets directory found.');
}

console.log('Build complete.');
