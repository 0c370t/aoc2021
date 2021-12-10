import { readFileSync } from "fs";

const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n");


type Bracket = ')'
    | '('
    | ']'
    | '['
    | '}'
    | '{'
    | '>'
    | '<'

const match: Record<Bracket, Bracket> = {
    ')': '(',
    '(': ')',
    ']': '[',
    '[': ']',
    '}': '{',
    '{': '}',
    '>': '<',
    '<': '>',
}

function partOne() {
    const scores = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    }
    
    let score = 0;
    fields.forEach((field) => {
        
        const stack: Bracket[] = [];
        Array.from(field).some(c => {
            switch (c) {
                case '(':
                case '[':
                case '{':
                case '<':
                    stack.push(c);
                    return false;
                case ')':
                case ']':
                case '}':
                case '>':
                    const top = stack.pop();
                    if (top !== match[c]) {
                        score += scores[c]
                        return true;
                    }
                    return false;
            }
            return false;
        })
    })
    return score;
}

function partTwo() {
    const scores = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }

    let scoreArray: number[] = [];
    
    
    fields.forEach((field) => {
        let score = 0;
        let corrupt = false;
        const stack: Bracket[] = [];
        Array.from(field).some(c => {
            // console.log(stack.join(","))
            switch (c) {
                case '(':
                case '[':
                case '{':
                case '<':
                    stack.push(c);
                    return false;
                case ')':
                case ']':
                case '}':
                case '>':
                    const top = stack.pop();
                    if (top !== match[c]) {
                        corrupt = true;
                        return true;
                    }
                    return false;
            }
            return false;
        })

        if (!corrupt) {
            let remaining = "";
            while(stack.length) {
                const top = stack.pop();
                remaining += match[top!];
                score *= 5;
                score += scores[match[top!]];
            }
            scoreArray.push(score);            
        }
    })
    
    return scoreArray.sort((a,b) => b-a)[Math.floor(scoreArray.length / 2)];
}

console.log(partOne())
console.log(partTwo())