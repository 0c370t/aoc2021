import {readFileSync} from "fs";

const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n");

function partOne() {
    let depth = 0;
    let position = 0;
    
    for(const field of fields) {
        console.log(field);
        const [dir, v] = field.split(" ");
        switch(dir) {
            case "forward":
                position += parseInt(v);
                break;
            case "up":
                depth -= parseInt(v);
                break;
            case "down":
                depth += parseInt(v);
                break;
        }
    }
    
    return depth * position;
}

function partTwo() {
    let depth = 0;
    let position = 0;
    let aim = 0;

    for(const field of fields) {
        console.log(field);
        const [dir, v] = field.split(" ");
        switch(dir) {
            case "forward":
                position += parseInt(v);
                depth += aim * parseInt(v);
                break;
            case "up":
                aim -= parseInt(v);
                break;
            case "down":
                aim += parseInt(v);
                break;
        }
    }
    return depth * position;
}


console.log("Part One", partOne());
console.log("Part Two", partTwo());