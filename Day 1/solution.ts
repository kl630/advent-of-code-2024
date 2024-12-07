// Read the input data
import { readFileSync } from 'fs';

const loadInput = (filePath) => {
    return readFileSync(filePath, 'utf8').trim().split('\n');
};

const processInput = (lines: string[]): {firstColumn: number[], secondColumn: number[]} => {
    const firstColumn: number[] = [];
    const secondColumn: number[] = [];

    for (const line of lines) {
        const [first, second] = line.split(/\s+/); // split by whitespace
        firstColumn.push(Number(first));
        secondColumn.push(Number(second));
    }

    return { firstColumn, secondColumn };
};

const lines = loadInput('input.txt');
const { firstColumn, secondColumn } = processInput(lines);

const sortedFirstColumn = firstColumn.sort((a, b) => {
    return a - b;
});

const sortedSecondColumn = secondColumn.sort((a, b) => {
    return a - b;
});

let res = 0;

for (let i = 0; i < sortedFirstColumn.length; i++) {
    const first = sortedFirstColumn[i];
    const second = sortedSecondColumn[i];
    const distance = Math.abs(second - first); // absolute value for distance
    res += distance;
}
// console.log('log res', res); 

// End of Part One

// Start of Part Two
let result = 0;
// create a hashmap for secondColumn
let record = new Map();
for (let number of secondColumn) {
    console.log('log typeof number', typeof number);
    if (record.has(number)) {
        record.set(number, record.get(number) + 1);
    } else {
        record.set(number, 1);
    }
}
// { key: value } - >  { number: its frequency }
// here you should get { 4: 1, 3: 3, 5: 1, 9: 1}

// loop through firstColumn
for (let number of firstColumn) {
    // for each number, look it up from hashmap and get its frequency
    let frequency = record.get(number) || 0;
    // similarity score = current number * its frequency
    let similarityScore = number * frequency;
    // increment result by that similarity score
    result += similarityScore;
}

// console.log('result', result);