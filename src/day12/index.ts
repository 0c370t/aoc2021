import chalk from "chalk";
import { readFileSync } from "fs";
const input = readFileSync(`${__dirname}/input.txt`).toString();
const fields = input.split("\n");

interface Node {
    name: string;
    edges: Node[];
    smallCave: boolean
}

function partOne() {
    const nodes = new Map<string, Node>();
    nodes.set("start", { name: "start", edges: [], smallCave: true })
    nodes.set("end", { name: "end", edges: [], smallCave: true })
    fields.forEach(f => {
        const [fromKey, toKey] = f.split("-")
        if (!nodes.has(fromKey)) nodes.set(fromKey, { name: fromKey, edges: [], smallCave: fromKey.toLowerCase() === fromKey})
        const from = nodes.get(fromKey)!;
        
        if (!nodes.has(toKey)) nodes.set(toKey, {name: toKey, edges: [], smallCave: toKey.toLowerCase() === toKey})
        const to = nodes.get(toKey)!;

        if (!from.edges.includes(to)) from.edges.push(to)
        if (!to.edges.includes(from)) to.edges.push(from)
    });


    const paths = new Set<Node[]>();
    function path(
        currentPath: Node[],
        fromNode: Node
    ) {
        if (fromNode.name ===  "end") {
            paths.add([...currentPath, fromNode]);
            return;
        }
        const options = fromNode.edges.filter(edge => 
            !edge.smallCave || 
            (edge.smallCave && !currentPath.includes(edge))
        )

        for(const option of options) {
            path([...currentPath, fromNode], option);
        }
    }
    path([], nodes.get("start")!);
    return paths.size;
}

function partTwo() {
    const nodes = new Map<string, Node>();
    nodes.set("start", { name: "start", edges: [], smallCave: true })
    nodes.set("end", { name: "end", edges: [], smallCave: true })
    fields.forEach(f => {
        const [fromKey, toKey] = f.split("-")
        if (!nodes.has(fromKey)) nodes.set(fromKey, { name: fromKey, edges: [], smallCave: fromKey.toLowerCase() === fromKey})
        const from = nodes.get(fromKey)!;
        
        if (!nodes.has(toKey)) nodes.set(toKey, {name: toKey, edges: [], smallCave: toKey.toLowerCase() === toKey})
        const to = nodes.get(toKey)!;

        if (!from.edges.includes(to)) from.edges.push(to)
        if (!to.edges.includes(from)) to.edges.push(from)
    });


    const paths = new Set<Node[]>();
    function path(
        currentPath: Node[],
        fromNode: Node,
        doubled: boolean = false,
        depth: number = 0
    ) {
        if (fromNode.name ===  "end") {
            // console.log([...currentPath, fromNode].map(p => p.name).join("->"));
            paths.add([...currentPath, fromNode]);
            return;
        }

        const options = fromNode.edges.filter(edge => 
            (!edge.smallCave || 
            (edge.smallCave && !currentPath.includes(edge)) || 
            (edge.smallCave && !doubled)) && edge.name !== "start"
        )
        const line = `${new Array(depth).fill(" ").join("")} | ${fromNode.name} | ${depth} ${doubled}`;
        if (doubled) {
            console.log(chalk.bold(line))
        } else {
            console.log(line)
        }
        for(const option of options) {
            let shouldDouble = false || doubled;
            if (option.smallCave && currentPath.includes(option)) {
                shouldDouble = true;
            }
            path([...currentPath, fromNode], option, shouldDouble, depth + 1);
        }
    }
    path([], nodes.get("start")!, false);

    return paths.size;

}


console.log(partOne());
console.log(partTwo());