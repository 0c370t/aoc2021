import { readFileSync } from "fs";

const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n");

const bitCount = fields[0].length;

function partOne() {
    const frequencies = new Array(bitCount).fill(0);

    fields.forEach((f) => {
        Array.from(f).forEach((v, i) => {
            frequencies[i] += parseInt(v)
        })
    })

    const epsilon = frequencies.map(f => f > fields.length / 2 ? 1 : 0).join("");
    const gamma = frequencies.map(f => f > fields.length / 2 ? 0 : 1).join("");

    return parseInt(epsilon, 2) * parseInt(gamma, 2)
}

function partTwo() {
    function findScore(mod: boolean) {
        let i = 0;
        let remaining = [...fields];

        while (remaining.length > 2) {
            console.log(i);
            console.log(remaining);
            const frequencies = new Array(bitCount).fill(0);

            remaining.forEach((f) => {
                Array.from(f).forEach((v, j) => {
                    frequencies[j] += parseInt(v)
                })
            });

            const significant = frequencies[i] >= remaining.length / 2
                ? mod ? "1" : "0"
                : mod ? "0" : "1";
                

            remaining = remaining.filter(f => f[i] === significant)
            i++;
        }
        // 7928162

        console.log(remaining);
        if (remaining.length > 1) {
            return remaining.filter(
                v => v[i] === (mod ? "1" : "0")
            ).reduce((a, b) => a + parseInt(b, 2), 0) ?? 0
        } else {
            return parseInt(remaining[0], 2);
        }
    }

    const oxy = findScore(true);
    const co2 = findScore(false);

    return oxy * co2;
}


console.log("Part One", partOne());

console.log("Part Two", partTwo());