const fs = require('fs');
// Start reading from file, we know it's likely UTF-16LE if Powershell made it, but let's try reading as utf16le or utf8
try {
    const content = fs.readFileSync('alignment_output.txt', 'utf16le'); // PowerShell default for > is often UTF-16LE
    console.log(content);
} catch (e) {
    console.log("Error reading utf16le, trying utf8");
    const content = fs.readFileSync('alignment_output.txt', 'utf8');
    console.log(content);
}
