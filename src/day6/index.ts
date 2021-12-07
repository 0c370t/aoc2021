import { readFileSync } from "fs";
const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n");

function partOne(ticks: number) {
    let fish: number[] = fields[0].split(",").map(s => parseInt(s))

    function tick() {
        const newFish: number[] = [];

        for (const f of fish) {
            const newF = f - 1;
            if (newF < 0) {
                newFish.push(6, 8);
            } else {
                newFish.push(newF);
            }
        }
        fish = newFish;
    }


    for (let i = 0; i < ticks; i++) 
        tick();
    return fish.length;
}

function partTwo(ticks: number) {
    const countFish = (f: number[]) => f.reduce((a,b) => a + b, 0)

    const fish = new Array(9).fill(0);
    fields[0].split(",").forEach(v => {
        fish[parseInt(v)]++;
    })

    const tick = () => {
        const newFish = fish.shift();
        fish.push(newFish)
        fish[6] += newFish;
    }

    for(let i=0; i<ticks; i++) {
        tick()
    }
    return countFish(fish);

}

console.log(partOne(80));
console.log(partTwo(256));

// 26,984,457,539