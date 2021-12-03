import {readFileSync} from "fs";

const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n").map((i) => parseInt(i));

function partOne() {
    let total = 0;
    let prev = fields[0];
    for(let i=1; i < fields.length; i++) {
        let current = fields[i];
        if (current > prev) total += 1;
        prev = current;
    }
    
    return total;
}

function partTwo() {
    let total = 0;

    for ( let i=0; i < fields.length; i++ ) {
        let windowA = fields[i] + fields[i+1] + fields[i+2];
        let windowB = fields[i+1] + fields[i+2] + fields[i+3];

        if (windowB > windowA) total += 1;
    }

    return total;
}



console.log(partOne());
console.log(partTwo());