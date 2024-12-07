"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Read the input data
var fs_1 = require("fs");
var loadInput = function (filePath) {
    return (0, fs_1.readFileSync)(filePath, 'utf8').trim().split('\n');
};
var processInput = function (lines) {
    var firstColumn = [];
    var secondColumn = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var _a = line.split(/\s+/), first = _a[0], second = _a[1]; // split by whitespace
        firstColumn.push(Number(first));
        secondColumn.push(Number(second));
    }
    return { firstColumn: firstColumn, secondColumn: secondColumn };
};
var lines = loadInput('input.txt');
var _a = processInput(lines), firstColumn = _a.firstColumn, secondColumn = _a.secondColumn;
var sortedFirstColumn = firstColumn.sort(function (a, b) {
    return a - b;
});
var sortedSecondColumn = secondColumn.sort(function (a, b) {
    return a - b;
});
var res = 0;
for (var i = 0; i < sortedFirstColumn.length; i++) {
    var first = sortedFirstColumn[i];
    var second = sortedSecondColumn[i];
    var distance = Math.abs(second - first); // absolute value for distance
    res += distance;
}
// console.log('log res', res); 
// End of Part One
// Start of Part Two
var result = 0;
// create a hashmap for secondColumn
var record = new Map();
for (var _i = 0, secondColumn_1 = secondColumn; _i < secondColumn_1.length; _i++) {
    var number = secondColumn_1[_i];
    console.log('log typeof number', typeof number);
    if (record.has(number)) {
        record.set(number, record.get(number) + 1);
    }
    else {
        record.set(number, 1);
    }
}
// { key: value } - >  { number: its frequency }
// here you should get { 4: 1, 3: 3, 5: 1, 9: 1}
// loop through firstColumn
for (var _b = 0, firstColumn_1 = firstColumn; _b < firstColumn_1.length; _b++) {
    var number = firstColumn_1[_b];
    // for each number, look it up from hashmap and get its frequency
    var frequency = record.get(number) || 0;
    // similarity score = current number * its frequency
    var similarityScore = number * frequency;
    // increment result by that similarity score
    result += similarityScore;
}
console.log('result', result);
