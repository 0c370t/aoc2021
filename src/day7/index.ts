import { readFileSync } from "fs";
const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n")[0].split(",").map(v => parseInt(v));

const minCrab = Math.min(...fields);
const maxCrab = Math.max(...fields);
const crabRange = maxCrab - minCrab;
const midCrab = crabRange / 2 + minCrab;

function partOne() {
    const getTotal = (target) => fields.reduce((a, b) => a + Math.abs(b - target), 0)
    
    function search(min, max) {
        if (min === max) return min;
        const mid = Math.round(((max - min) / 2) + min);
        const minDist = getTotal(min);
        const midDist = getTotal(mid);
        const maxDist = getTotal(max);
        console.table({
            min: {val: min, dist: minDist},
            mid: {val: mid, dist: midDist},
            max: {val: max, dist: maxDist}
        })
        const upperDist = Math.abs(maxDist - midDist);
        const lowerDist = Math.abs(midDist - minDist);
        switch (true) {
            case mid === max || mid == min: {
                switch (Math.min(minDist, midDist, maxDist)) {
                    case minDist: return min;
                    case midDist: return mid;
                    case maxDist: return max;
                }
                throw new Error("Wat")
            }
            case upperDist === lowerDist: {
                // Distance between min-mid and mid-max is the same
                // We should base this on the smallest absolute value
                if (minDist < maxDist) {
                    return search(min, mid)
                } else {
                    return search(mid, max)
                }
                break;
            }
            case upperDist > lowerDist: {
                // min-mid is smaller than mid-max
                return search(min, mid)
            }
            case upperDist < lowerDist: {
                // mid-max is smaller than min-mid
                return search(mid, max)
            }
        }

    }
    console.log(search(minCrab, maxCrab))    
}
function partTwo() {
    const baseSum = (o) => {
        let output = o;
        for(let i = o - 1; i>0; i--) output += i;
        return output;
    }
    const getTotal = (target) => fields.reduce((a, b) => a + baseSum(Math.abs(b - target)), 0)
    
    function search(min, max) {
        if (min === max) return min;
        const mid = Math.round(((max - min) / 2) + min);
        const minDist = getTotal(min);
        const midDist = getTotal(mid);
        const maxDist = getTotal(max);
        console.table({
            min: {val: min, dist: minDist},
            mid: {val: mid, dist: midDist},
            max: {val: max, dist: maxDist}
        })
        const upperDist = Math.abs(maxDist - midDist);
        const lowerDist = Math.abs(midDist - minDist);
        switch (true) {
            case mid === max || mid == min: {
                switch (Math.min(minDist, midDist, maxDist)) {
                    case minDist: return min;
                    case midDist: return mid;
                    case maxDist: return max;
                }
                throw new Error("Wat")
            }
            case upperDist === lowerDist: {
                // Distance between min-mid and mid-max is the same
                // We should base this on the smallest absolute value
                if (minDist < maxDist) {
                    return search(min, mid)
                } else {
                    return search(mid, max)
                }
                break;
            }
            case upperDist > lowerDist: {
                // min-mid is smaller than mid-max
                return search(min, mid)
            }
            case upperDist < lowerDist: {
                // mid-max is smaller than min-mid
                return search(mid, max)
            }
        }

    }
    console.log(search(minCrab, maxCrab))    
}


partOne()
partTwo()