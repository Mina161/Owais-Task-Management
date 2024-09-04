function generateFuzzyArray(string) {
    const stringLower = string.toLowerCase();
    let fuzzyArray = [];
    
    // Split string into parts (e.g., "John Doe" -> ["John", "Doe"])
    const stringParts = stringLower.split(' ');

    // Add the full string
    fuzzyArray.push(stringLower);

    // Add each part of the string
    fuzzyArray = fuzzyArray.concat(stringParts);

    // Add prefixes
    stringParts.forEach(part => {
        for (let i = 1; i < part.length; i++) {
            fuzzyArray.push(part.substring(0, i));
        }
    });

    // Remove duplicates
    fuzzyArray = [...new Set(fuzzyArray)];

    return fuzzyArray;
}

module.exports = { generateFuzzyArray }
