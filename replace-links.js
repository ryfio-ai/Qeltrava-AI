/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'app');
const componentsDir = path.join(__dirname, 'components');

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replace standard Next Link with i18n Link
            if (content.includes("import Link from 'next/link';")) {
                content = content.replace(/import Link from 'next\/link';/g, "import { Link } from '@/src/routing';");
            }
            if (content.includes('import Link from "next/link";')) {
                content = content.replace(/import Link from "next\/link";/g, "import { Link } from '@/src/routing';");
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log("Updated Link: " + fullPath);
            }
        }
    });
}

if (fs.existsSync(directory)) walkDir(directory);
if (fs.existsSync(componentsDir)) walkDir(componentsDir);
console.log("Global link replace complete.");

