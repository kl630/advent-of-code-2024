// Read the input data
import { readFileSync } from 'fs';

const loadInput = (filePath: string): string[] => {
    return readFileSync(filePath, 'utf8').trim().split('\n'); // split into separate lines
};

const lines = loadInput('input.txt');

let count: number = 0;

const isSafe = (report: number[]): boolean => {
    // use first elem and second elem's diff as a baseline 
    const baseline: number = report[1] - report[0];
    if (![1, 2, 3].includes(Math.abs(baseline))) {
        return false;
    }
    // starting from the second elem, loop through report array
    for (let i = 1; i < report.length - 1; i++) {
        let nextDiff: number = report[i+1] - report[i];
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

for (let line of lines) {
    const report: number[] = line.split(/\s+/).map(elem => Number(elem)); 
    if (isSafe(report)) {
        count++;
    }
}

// console.log('log count', count);
// End of Part 1

// Start of Part 2
// TODO: use higher-order functions ( )
let dampenerCount = 0;

// use simulation
// simulate that we remove the current elem 
for (let line of lines) {
    const report: number[] = line.split(/\s+/).map(elem => Number(elem)); 
    if (isSafe(report)) {
        dampenerCount++;
        continue;
    }
    for (let i = 0; i < report.length; i++) {
        let modifiedReport = [...report];
        modifiedReport.splice(i, 1);
        if (isSafe(modifiedReport)) {
            dampenerCount++;
            break; // Need to exist the current iteration altogether. We are done processing the current report.
        }
    }
}

console.log('log dampenerCount', dampenerCount);