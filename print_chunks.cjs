const fs = require('fs');
const start = parseInt(process.argv[2]);
const end = parseInt(process.argv[3]);

try {
    const content = fs.readFileSync('alignment_output.txt', 'utf8');
    const lines = content.split('\n');
    console.log(lines.slice(start, end).join('\n'));
} catch (e) {
    console.log("Error reading utf8, trying utf16le");
    const content = fs.readFileSync('alignment_output.txt', 'utf16le');
    const lines = content.split('\n');
    console.log(lines.slice(start, end).join('\n'));
}
