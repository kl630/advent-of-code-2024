"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// Read the input data
var fs_1 = require("fs");
var loadInput = function (filePath) {
    return (0, fs_1.readFileSync)(filePath, 'utf8').trim().split('\n'); // split into separate lines
};
var lines = loadInput('input.txt');
var count = 0;
var isSafe = function (report) {
    // use first elem and second elem's diff as a baseline 
    var baseline = report[1] - report[0];
    if (![1, 2, 3].includes(Math.abs(baseline))) {
        return false;
    }
    // starting from the second elem, loop through report array
    for (var i = 1; i < report.length - 1; i++) {
        var nextDiff = report[i + 1] - report[i];
        // if nextDiff and baseline are 1 positive and 1 negative
        if (nextDiff * baseline < 0) {
            return false;
        }
        // if nextDiff's absolute value is not 1 OR 2 OR 3
        if (![1, 2, 3].includes(Math.abs(nextDiff))) {
            return false;
        }
    }
    return true;
};
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var report = line.split(/\s+/).map(function (elem) { return Number(elem); });
    if (isSafe(report)) {
        count++;
    }
}
// console.log('log count', count);
// End of Part 1
// Start of Part 2
// TODO: use higher-order functions ( )
var dampenerCount = 0;
// use simulation
// simulate that we remove the current elem 
for (var _a = 0, lines_2 = lines; _a < lines_2.length; _a++) {
    var line = lines_2[_a];
    var report = line.split(/\s+/).map(function (elem) { return Number(elem); });
    if (isSafe(report)) {
        dampenerCount++;
        continue;
    }
    for (var i = 0; i < report.length; i++) {
        var modifiedReport = __spreadArray([], report, true);
        modifiedReport.splice(i, 1);
        console.log('log report', modifiedReport);
        if (isSafe(modifiedReport)) {
            dampenerCount++;
            break;
        }
    }
}
console.log('log dampenerCount', dampenerCount);
