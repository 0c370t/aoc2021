import chalk from "chalk";
import { readFileSync } from "fs";
const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n");

//@ts-ignore
process.stdout.write('\x1BC');
process.stdout.write("\u001b[2J\u001b[0;0H");
console.log("");
const getHeavyHorizontal = (l: number) => new Array(l).fill("━").join("")
const getLightHorizontal = (l: number) => new Array(l).fill("─").join("")
const padCenter = (s: string, l: number) =>
    s.padStart(Math.floor((s.length + l) / 2)).padEnd(l);

const printSet = (rows: number[][], flashedCoords: [number, number][], label: string) => {
    let out = "";


    out += chalk.red(`┌${getLightHorizontal(rows.length + 1)}┐`) + "\n"
    out += `${chalk.red("│")} ${chalk.redBright.bold(padCenter(label, rows.length))}${chalk.red("│")}` + "\n"
    out += chalk.red(`┟━${getHeavyHorizontal(rows.length)}┷${getHeavyHorizontal(rows.length - 2)}━┓`) + "\n"
    for (let x = 0; x < rows.length; x++) {
        out += chalk.red("┃ ")
        for (let y = 0; y < rows[x].length; y++) {
            if (flashedCoords.some(([x2, y2]) => x === x2 && y === y2))
                out += `${chalk.bold.blue(rows[x][y])} `
            else
                out += `${chalk.green(rows[x][y])} `
        }
        out += chalk.red("┃ ") + "\n"
    }
    out += chalk.red(`┗━${new Array(rows[0].length).fill("━").join("━")}━┛`) + "\n"
    return out;
}

function partOne() {
    const rows = fields.map(f => Array.from(f).map(v => parseInt(v)));
    let flashes = 0;
    function step(index: number) {
        // Increment
        for (let x = 0; x < rows.length; x++) for (let y = 0; y < rows[x].length; y++) rows[x][y]++;


        const flashedCoords: [number, number][] = [];

        function flash(x: number, y: number) {
            if (flashedCoords.some(([x2, y2]) => x2 === x && y2 === y)) {
                // Do nothing; we've already flashed
                return;
            }

            flashes++;

            // console.log(
            //     `(${x}, ${y}) = ${rows[x][y]} || [${rows.length}, ${rows[x].length}], <${Boolean(rows[x])}, ${Boolean(rows[x][y])}>`
            // )


            flashedCoords.push([x, y]);
            rows[x][y] = 0

            const canLeft = x > 0;
            const canRight = x < rows.length - 1;
            const canUp = y > 0;
            const canDown = y < rows[x].length - 1;
            // Increment all the numbers
            if (canLeft) rows[x - 1][y] += 1
            if (canRight) rows[x + 1][y] += 1
            if (canUp) rows[x][y - 1] += 1
            if (canDown) rows[x][y + 1] += 1

            if (canLeft && canUp) rows[x - 1][y - 1] += 1;
            if (canLeft && canDown) rows[x - 1][y + 1] += 1;
            if (canRight && canUp) rows[x + 1][y - 1] += 1;
            if (canRight && canDown) rows[x + 1][y + 1] += 1;

            // Check all the new ones to see if they need to flash now
            if (canLeft && rows[x - 1][y] > 9) flash(x - 1, y)
            if (canRight && rows[x + 1][y] > 9) flash(x + 1, y)
            if (canUp && rows[x][y - 1] > 9) flash(x, y - 1)
            if (canDown && rows[x][y + 1] > 9) flash(x, y + 1)

            if (canLeft && canUp && rows[x - 1][y - 1] > 9) flash(x - 1, y - 1)
            if (canLeft && canDown && rows[x - 1][y + 1] > 9) flash(x - 1, y + 1)
            if (canRight && canUp && rows[x + 1][y - 1] > 9) flash(x + 1, y - 1)
            if (canRight && canDown && rows[x + 1][y + 1] > 9) flash(x + 1, y + 1)

        }

        for (let x = 0; x < rows.length; x++) {
            for (let y = 0; y < rows[x].length; y++) {
                if (rows[x][y] > 9) {
                    // Flash!
                    flash(x, y)
                }
            }
        }

        flashedCoords.forEach(([x, y]) => {
            rows[x][y] = 0;
        })

        return printSet(rows, flashedCoords, `Step ${index}`)

    }
    const sets = [printSet(rows, [], `Initial`)]

    for (let i = 0; i < 100; i++) {
        sets.push(step(i + 1));

        if (sets.length === 3) {
            const out: string[][] = [];
            let maxLen = Number.MIN_SAFE_INTEGER
            sets.forEach((set) => {
                set.split("\n").forEach((line, i) => {
                    while (!out[i]) out.push([]);
                    // \x1B[31m
                    const cleanLine = line.replace(/\x1B\[\d+m/g, "")
                    if (cleanLine.length > maxLen) {
                        maxLen = cleanLine.length;
                    }
                    
                    out[i].push(line);
                })
            })
            out.forEach((lineSet) => 
                console.log(lineSet.map(l => {
                    const cleanLine = l.replace(/\x1B\[\d+m/g, "");
                    const diff = l.length - cleanLine.length;
                    return l.padEnd(maxLen + diff)
                }).join("\t"))
            )
            sets.splice(0, sets.length);            
        }
    }
    return flashes;
}
function partTwo() {
    const rows = fields.map(f => Array.from(f).map(v => parseInt(v)));
    function step(index: number): [string, boolean] {
        // Increment
        for (let x = 0; x < rows.length; x++) for (let y = 0; y < rows[x].length; y++) rows[x][y]++;


        const flashedCoords: [number, number][] = [];

        function flash(x: number, y: number) {
            if (flashedCoords.some(([x2, y2]) => x2 === x && y2 === y)) {
                // Do nothing; we've already flashed
                return;
            }

            flashedCoords.push([x, y]);
            rows[x][y] = 0

            const canLeft = x > 0;
            const canRight = x < rows.length - 1;
            const canUp = y > 0;
            const canDown = y < rows[x].length - 1;
            // Increment all the numbers
            if (canLeft) rows[x - 1][y] += 1
            if (canRight) rows[x + 1][y] += 1
            if (canUp) rows[x][y - 1] += 1
            if (canDown) rows[x][y + 1] += 1

            if (canLeft && canUp) rows[x - 1][y - 1] += 1;
            if (canLeft && canDown) rows[x - 1][y + 1] += 1;
            if (canRight && canUp) rows[x + 1][y - 1] += 1;
            if (canRight && canDown) rows[x + 1][y + 1] += 1;

            // Check all the new ones to see if they need to flash now
            if (canLeft && rows[x - 1][y] > 9) flash(x - 1, y)
            if (canRight && rows[x + 1][y] > 9) flash(x + 1, y)
            if (canUp && rows[x][y - 1] > 9) flash(x, y - 1)
            if (canDown && rows[x][y + 1] > 9) flash(x, y + 1)

            if (canLeft && canUp && rows[x - 1][y - 1] > 9) flash(x - 1, y - 1)
            if (canLeft && canDown && rows[x - 1][y + 1] > 9) flash(x - 1, y + 1)
            if (canRight && canUp && rows[x + 1][y - 1] > 9) flash(x + 1, y - 1)
            if (canRight && canDown && rows[x + 1][y + 1] > 9) flash(x + 1, y + 1)

        }

        for (let x = 0; x < rows.length; x++) {
            for (let y = 0; y < rows[x].length; y++) {
                if (rows[x][y] > 9) {
                    // Flash!
                    flash(x, y)
                }
            }
        }

        flashedCoords.forEach(([x, y]) => {
            rows[x][y] = 0;
        })

        return [printSet(rows, flashedCoords, `Step ${index}`), flashedCoords.length === rows.length * rows[0].length]

    }
    const sets = [printSet(rows, [], `Initial`)]

    
    for (let i = 0; i < 10000; i++) {
        const [result, done] = step(i + 1)
        sets.push(result)
        if (sets.length === 3 || done) {
            const out: string[][] = [];
            let maxLen = Number.MIN_SAFE_INTEGER
            sets.forEach((set) => {
                set.split("\n").forEach((line, i) => {
                    while (!out[i]) out.push([]);
                    // \x1B[31m
                    const cleanLine = line.replace(/\x1B\[\d+m/g, "")
                    if (cleanLine.length > maxLen) {
                        maxLen = cleanLine.length;
                    }
                    
                    out[i].push(line);
                })
            })
            out.forEach((lineSet) => 
                console.log(lineSet.map(l => {
                    const cleanLine = l.replace(/\x1B\[\d+m/g, "");
                    const diff = l.length - cleanLine.length;
                    return l.padEnd(maxLen + diff)
                }).join("\t"))
            )
            sets.splice(0, sets.length);            
        }
        if (done) {
            return i + 1;
        }
    }
    return -1;
}

console.log(partOne());
console.log(partTwo());