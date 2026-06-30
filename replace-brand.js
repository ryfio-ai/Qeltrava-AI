const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'app');

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replace Quantra with Qeltrava
            content = content.replace(/Quantra AI/g, 'Qeltrava AI');
            content = content.replace(/Quantra Delivery OS/g, 'Qeltrava Delivery OS');
            content = content.replace(/Quantra/g, 'Qeltrava');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log("Updated: " + fullPath);
            }
        }
    });
}

walkDir(directory);
console.log("Global find-and-replace complete.");
