import { readFileSync } from "fs";

const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n");

function parseField(f: string) {
    const rawCoords = f.split(" -> ").map(s => s.split(","))

    const output = {
        start: {
            x: parseInt(rawCoords[0][0]),
            y: parseInt(rawCoords[0][1])
        },
        end: {
            x: parseInt(rawCoords[1][0]),
            y: parseInt(rawCoords[1][1])
        }
    }
    return output;
}

const parsedFields = fields.map(parseField);
const [maxX, maxY] = parsedFields.reduce<[number, number]>((acc, v) => {
    if (v.start.x > acc[0]) acc[0] = v.start.x;
    if (v.end.x > acc[0]) acc[0] = v.end.x;

    if (v.start.y > acc[1]) acc[1] = v.start.y;
    if (v.end.y > acc[1]) acc[1] = v.end.y;

    return acc;
}, [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])



function partOne() {
    const seaFloor = new Array(maxX + 1).fill(null).map(() => new Array(maxY + 1).fill(0))
    parsedFields.forEach(({ start, end }) => {
        if (start.x === end.x) {
            // Vertical
            let min = Math.min(start.y, end.y);
            let max = Math.max(start.y, end.y);
            let axis = start.x;
            for (let i = min; i <= max; i++) {
                seaFloor[axis][i] += 1;
            }
        }
        else if (start.y === end.y) {
            // Horizontal
            let min = Math.min(start.x, end.x);
            let max = Math.max(start.x, end.x);
            let axis = start.y;
            for (let i = min; i <= max; i++) {
                seaFloor[i][axis] += 1;
            }
        } else {
            // Ignore
        }
    })

    let impacted = 0;

    seaFloor.forEach(row => {
        row.forEach((cell) => {
            if (cell > 1) impacted++
        })
    })
    return impacted
}
function partTwo() {
    const seaFloor = new Array(maxX + 1).fill(null).map(() => new Array(maxY + 1).fill(0))
    parsedFields.forEach(({ start, end }) => {
        // if (start.x !== end.x && start.y !== end.y) return;
        let yMod = start.y === end.y ? 0 : start.y > end.y ? -1 : 1;
        let mutY = start.y;

        let xMod = start.x === end.x ? 0 : start.x > end.x ? -1 : 1;
        let mutX = start.x;
        
        while (mutY !== end.y || mutX !== end.x) {
            
            seaFloor[mutX][mutY]++;
    
            mutY += yMod;
            mutX += xMod;
        }
        seaFloor[mutX][mutY]++
    })

    let impacted = 0;

    seaFloor.forEach(row => {
        console.log(row.join(" "))
        row.forEach((cell) => {
            if (cell > 1) impacted++
        })
    })
    return impacted
}

console.log(partOne());
console.log(partTwo());