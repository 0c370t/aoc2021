import { readFileSync } from "fs";

const input = readFileSync(`${__dirname}/input.txt`).toString();

interface SignalSet {
    signals: string[];
    actual: string[];
}

const fields = input.split("\n").map<SignalSet>((line) => {
    const [signals, actual] = line.split("|");
    return {
        signals: signals.split(" ").filter(Boolean),
        actual: actual.split(" ").filter(Boolean)
    }
});

/*
 Example Display:
 
  aaaa
 b    c
 b    c
  dddd
 e    f
 e    f
  gggg

*/

function partOne() {
    const ones: string[] = [];
    const fours: string[] = [];
    const sevens: string[] = [];
    const eights: string[] = [];

    fields.forEach((f, i) => {
        f.actual.forEach(signal => {
            switch(signal.length) {
                case 2: ones.push(signal); return;
                case 4: fours.push(signal); return;
                case 3: sevens.push(signal); return;
                case 7: eights.push(signal); return;
            }
        })
    })

    return ones.length + fours.length + sevens.length + eights.length;
}

function partTwo() {
    
    return fields.reduce((acc, f) => {
        const posMap = {
            // a: '', // Appears 8 times | Comes from /Seven/ - /F/ - /C/
            // b: '', // Appears 6 times | Comes from Count
            // c: '', // Appears 8 times | Comes from /One/ - /F/
            // d: '', // Appears 7 times | Ambigious
            // e: '', // Appears 4 times | Comes from Count
            // f: '', // Appears 9 times | Comes from Count
            // g: '', // Appears 7 times | Ambigious
        }
        const knowns: Record<"one" | "four" | "seven" | "eight", string[]> = {
            one: [],
            four: [],
            seven: [],
            eight: [],
        }

        const occurances = f.signals.reduce((acc, v) => {
            Array.from(v).forEach(char => acc[char] += 1)
            switch(v.length) {
                case 2: knowns.one = Array.from(v); break;
                case 4: knowns.four = Array.from(v); break;
                case 3: knowns.seven = Array.from(v); break;
                case 7: knowns.eight = Array.from(v); break;
            }

            return acc;
        }, {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0});

        // Build initial set of characters with a unique appearance count
        Object.entries(occurances).forEach(([map, occurance]) => {
            switch (occurance) {
                case 6: posMap[map] = "b"; break;
                case 4: posMap[map] = "e"; break;
                case 9: posMap[map] = "f"; break;
            }
        })
        // The number that appears in one, that is known, is F
        // Thus, the other one is C
        knowns.one.forEach((c) => {
            if (!Object.keys(posMap).includes(c)) {
                posMap[c] = "c"
            }
        })
        // The numbers that appears in seven, that are known, are C and F
        // Thus, the other one is A
        knowns.seven.forEach((a) => {
            if (!Object.keys(posMap).includes(a)) {
                posMap[a] = "a"
            }
        })
        knowns.four.forEach((character) => {
            if (!Object.keys(posMap).includes(character)) {
                // Not already known
                if(occurances[character] === 7) {
                    posMap[character] = "d"
                } else if (occurances[character] === 6) { 
                    posMap[character] = "b"
                } else {
                    throw new Error("Weird state encountered")
                }
            }
        })
        knowns.eight.forEach((g) => {
            if (!Object.keys(posMap).includes(g)) {
                posMap[g] = "g";
            }
        })


        const integerLookup = {
            "abcefg": "0",
            "cf": "1",
            "acdeg": "2",
            "acdfg": "3",
            "bcdf": "4",
            "abdfg": "5",
            "abdefg": "6",
            "acf": "7",
            "abcdefg": "8",
            "abcdfg": "9"
        } 

        
        const result = f.actual.map((a) => 
                integerLookup[Array.from(a).map(v => posMap[v]).sort().join("")]
        ).join("")
        
        return acc + parseInt(result);
    }, 0)
    
}



console.log(partOne());
console.log(partTwo());