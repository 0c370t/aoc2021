import { readFileSync } from "fs";
import { zip } from "lodash";


function evalBoard(b: number[][]) {
    if (b.some((row) => row.reduce((x, y) => x + y, 0) === -5)) {
        // has a win
        return true;
    }

    const cols: number[][] = zip(...b) as number[][];
    if (cols.some((row) => row.reduce((x, y) => x + y, 0) === -5)) {
        // has a win
        return true;
    }
}

function getScore(b: number[][], d: number) {
    return b.reduce(
        (acc1, v1) =>
            acc1 + v1.reduce(
                (acc2, v2) => {
                    if (v2 > 0) return acc2 + v2;
                    else return acc2;
                }, 0
            )
        , 0
    ) * d
}



function partOne() {
    const input = readFileSync(`${__dirname}/input.txt`).toString();
    const fields = input.split("\n");

    // Bootstrap
    const drawings = JSON.parse(`[${fields.splice(0, 2)[0]}]`);
    const boards: number[][][] = []

    while (fields.length) {
        boards.push(
            fields.splice(0, 6).slice(0, 5).map(
                row => row.split(/\s/).filter(Boolean).map(x => parseInt(x))
            )
        );
    }

    let winningBoard: number[][] = [];
    let winningDraw = 0;
    drawings.some((d, i) => {
        const v = boards.some((b) => {
            for (let x = 0; x < b.length; x++) {
                for (let y = 0; y < b[x].length; y++) {
                    if (b[x][y] === d) {
                        b[x][y] = -1;
                        if (evalBoard(b)) {
                            // exit condition
                            winningBoard = b;
                            winningDraw = d;
                            return true
                        }
                    }
                }
            }
            return false;
        })
        return v;
    })

    return getScore(winningBoard, winningDraw)

}

function partTwo() {
    const input = readFileSync(`${__dirname}/input.txt`).toString();
    const fields = input.split("\n");

    // Bootstrap
    const drawings = JSON.parse(`[${fields.splice(0, 2)[0]}]`);
    let boards: number[][][] = []

    while (fields.length) {
        boards.push(
            fields.splice(0, 6).slice(0, 5).map(
                row => row.split(/\s/).filter(Boolean).map(x => parseInt(x))
            )
        );
    }

    let winningBoard: number[][] = [];
    let winningDraw = 0;

    drawings.some((d, i) => {
        const dirty: number[][][] = [];

        const v = boards.some((b) => {
            for (let x = 0; x < b.length; x++) {
                for (let y = 0; y < b[x].length; y++) {
                    if (b[x][y] === d) {
                        b[x][y] = -1;
                        if (evalBoard(b)) {
                            if (boards.length > 1) {
                                dirty.push(b);
                            } else {
                                winningBoard = boards[0];
                                winningDraw = d;
                                return true;
                    
                            }
                        }
                    }
                }
            }
            return false;
        })
        boards = boards.filter(_b => !dirty.includes(_b));

        return v;
    })

    return getScore(winningBoard, winningDraw)

}



console.log(partOne());
console.log(partTwo());