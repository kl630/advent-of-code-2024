// Read the input data
import { readFileSync } from 'fs';

const loadInput = (filePath: string): string => {
    return readFileSync(filePath, 'utf8').trim();
};

const regex = /mul\((-?\d+),(-?\d+)\)/g;

const processData = (data: string): number => {
    let match;
    let total = 0;

    while ((match = regex.exec(data)) !== null) {
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);

        total += num1 * num2;
    }
    return total;
};

const rawData: string = loadInput('input.txt');

const res: number = processData(rawData);

// console.log('log res', res);
// End of Part 1

// // Start of Part 2
const newRegex = /mul\((-?\d+),(-?\d+)\)|do\(\)|don't\(\)/g;  // Regex for mul, do, and don't instructions

// Function to process the data with do() and don't() instructions
const processDataWithDoOrDont = (data: string): number => {
    let isMulEnabled = true;  // Initially mul() is enabled
    let result = 0;

    // Match the regex pattern in the data
    const matches = data.match(newRegex);

    // Loop through each matched instruction
    if (matches) {
        for (const match of matches) {
            if (match.includes('mul')) {
                // Extract the numbers from mul() and process them
                const num1 = parseInt(match.match(/-?\d+/g)![0], 10);  // First number in mul()
                const num2 = parseInt(match.match(/-?\d+/g)![1], 10);  // Second number in mul()
                
                // Only apply mul if enabled
                if (isMulEnabled) {
                    result += num1 * num2;
                }
            } else if (match === 'do()') {
                // Enable multiplication
                isMulEnabled = true;
            } else if (match === "don't()") {
                // Disable multiplication
                isMulEnabled = false;
            }
        }
    }

    return result;
};

// Process the input data with do() and don't() logic
const finalRes: number = processDataWithDoOrDont(rawData);

// Output the final result
console.log('Final Result:', finalRes);
