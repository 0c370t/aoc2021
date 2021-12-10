import chalk from "chalk";
import { readFileSync } from "fs";

const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n").map(s => Array.from(s).map(_s => parseInt(_s)));

const print2dArray = (a) => console.log(a.forEach(f => console.log(f.join(" "))));



function partOne() {
    const checkedMap = new Array(fields.length).fill("").map(() => new Array(fields[0].length).fill(0))
    print2dArray(checkedMap)
    for(let x=0; x<fields.length; x++) {
        for (let y=0; y<fields[x].length; y++) {
            let looping = true;
            let tx = x;
            let ty = y;
            let prevMove = ''
            while (looping) {
                // FLOW
                if (ty > 0 && fields[tx][ty - 1] <= fields[tx][ty] && prevMove !== 'D') {
                    // Up
                    ty -= 1;
                    prevMove = 'U'
                } else
                if (tx > 0 && fields[tx - 1][ty] <= fields[tx][ty] && prevMove !== 'R') {
                    // Left
                    prevMove = 'L'
                    tx -= 1;
                } else
                if (ty < fields[x].length - 1 && fields[tx][ty + 1] <= fields[tx][ty] && prevMove !== 'U') {
                    // Down
                    prevMove = 'D'
                    ty += 1;
                } else 
                if (tx < fields.length - 1 && fields[tx + 1][ty] <= fields[tx][ty] && prevMove !== 'L') {
                    // Right
                    prevMove = 'R'
                    tx += 1;
                } else {
                    // We have found our spot
                    checkedMap[tx][ty] = 1;
                    looping = false;
                }
            }
            fields[x][y]
        }
    }
    let sum = 0;
    for(let x=0; x<fields.length; x++) {
        for (let y=0; y<fields[x].length; y++) {
            if (checkedMap[x][y]) {
                sum += fields[x][y] + 1
            }
        }
    }
    
    return sum
    
}

function partTwo() {
    const checkedMap = new Array(fields.length).fill("").map(() => new Array(fields[0].length).fill(0))
    const countMap = new Array(fields.length).fill("").map(() => new Array(fields[0].length).fill(0))
    print2dArray(checkedMap)
    for(let x=0; x<fields.length; x++) {
        for (let y=0; y<fields[x].length; y++) {
            let looping = true;
            let tx = x;
            let ty = y;
            let prevMove = ''
            if (fields[tx][ty] !== 9) 
                        checkedMap[tx][ty] += 1; // Count up for basin
                    
            while (looping) {
                // FLOW
                if (ty > 0 && fields[tx][ty - 1] <= fields[tx][ty] && prevMove !== 'D') {
                    // Up
                    ty -= 1;
                    prevMove = 'U'
                } else
                if (tx > 0 && fields[tx - 1][ty] <= fields[tx][ty] && prevMove !== 'R') {
                    // Left
                    prevMove = 'L'
                    tx -= 1;
                } else
                if (ty < fields[x].length - 1 && fields[tx][ty + 1] <= fields[tx][ty] && prevMove !== 'U') {
                    // Down
                    prevMove = 'D'
                    ty += 1;
                } else 
                if (tx < fields.length - 1 && fields[tx + 1][ty] <= fields[tx][ty] && prevMove !== 'L') {
                    // Right
                    prevMove = 'R'
                    tx += 1;
                } else {
                    // We have found our spot
                    if (fields[x][y] !== 9)
                        countMap[tx][ty] += 1;
                    looping = false;
                }
            }
            fields[x][y]
        }
    }

    console.log(countMap.flat().filter(Boolean).sort((a,b) => b - a).slice(0,3).reduce((acc, v) => acc * v, 1))
    
    
}

console.log(partOne());
console.log(partTwo());