const fs = require('fs');
const path = require('path');

// Read the scienceTerm.js file
const filePath = path.join(__dirname, 'src', 'components', 'scienceTerm.js');
let content = fs.readFileSync(filePath, 'utf8');

// Function to convert property names to uppercase
function convertToUppercase(content) {
    // Regular expression to match property names
    const regex = /\b([A-Za-z]+):/g;
    
    // Replace each property name with its uppercase version
    return content.replace(regex, (match, p1) => {
        return p1.toUpperCase() + ':';
    });
}

// Convert the content
const updatedContent = convertToUppercase(content);

// Write back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('Conversion completed successfully!');
