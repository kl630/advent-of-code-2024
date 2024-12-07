"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Read the input data
var fs_1 = require("fs");
var loadInput = function (filePath) {
    return (0, fs_1.readFileSync)(filePath, 'utf8').trim();
};
var regex = /mul\((-?\d+),(-?\d+)\)/g;
var processData = function (data) {
    var match;
    var total = 0;
    while ((match = regex.exec(data)) !== null) {
        var num1 = parseInt(match[1], 10);
        var num2 = parseInt(match[2], 10);
        total += num1 * num2;
    }
    return total;
};
var rawData = loadInput('input.txt');
var res = processData(rawData);
// console.log('log res', res);
// End of Part 1
// // Start of Part 2
var newRegex = /mul\((-?\d+),(-?\d+)\)|do\(\)|don't\(\)/g; // Regex for mul, do, and don't instructions
// Function to process the data with do() and don't() instructions
var processDataWithDoOrDont = function (data) {
    var isMulEnabled = true; // Initially mul() is enabled
    var result = 0;
    // Match the regex pattern in the data
    var matches = data.match(newRegex);
    // Loop through each matched instruction
    if (matches) {
        for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
            var match = matches_1[_i];
            if (match.includes('mul')) {
                // Extract the numbers from mul() and process them
                var num1 = parseInt(match.match(/-?\d+/g)[0], 10); // First number in mul()
                var num2 = parseInt(match.match(/-?\d+/g)[1], 10); // Second number in mul()
                // Only apply mul if enabled
                if (isMulEnabled) {
                    result += num1 * num2;
                }
            }
            else if (match === 'do()') {
                // Enable multiplication
                isMulEnabled = true;
            }
            else if (match === "don't()") {
                // Disable multiplication
                isMulEnabled = false;
            }
        }
    }
    return result;
};
// Process the input data with do() and don't() logic
var finalRes = processDataWithDoOrDont(rawData);
// Output the final result
console.log('Final Result:', finalRes);
