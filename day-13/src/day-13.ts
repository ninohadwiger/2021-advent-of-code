import {TimeUtils} from "../../utils/time.utils";

export interface FoldInstruction {
    axis: 'x' | 'y';
    value: number;
}

export class TransparentPaper {

    private folded: number[][];
    private visible: Set<string>;

    private ROWS: number = -1;
    private COLS: number = -1;

    private currentInstructionIndex = 0;

    constructor(private original: number[][], private instructions: FoldInstruction[]) {
        this.folded = original;
        this.visible = new Set(original.map(([x, y]) => `${x},${y}`));

        for (let [x, y] of original) {
            this.ROWS = Math.max(this.ROWS, y + 1);
            this.COLS = Math.max(this.COLS, x + 1);
        }
    }

    get numberOfVisibleDots(): number {
        return this.visible.size;
    }

    public foldAll(): void {
        while (this.currentInstructionIndex < this.instructions.length) {
            this.fold();
        }
    }

    public fold(): void {

        if (this.currentInstructionIndex >= this.instructions.length)
            throw new Error('All instructions are already executed.');

        const instruction = this.instructions[this.currentInstructionIndex];
        const axisIndex = instruction.axis === 'x' ? 0 : 1;

        this.folded = this.folded.map(dot => {
            if (dot[axisIndex] > instruction.value) {
                this.visible.delete(`${dot[0]},${dot[1]}`);
                dot[axisIndex] = instruction.value - (dot[axisIndex] - instruction.value);
                this.visible.add(`${dot[0]},${dot[1]}`);
                return dot;
            }
            return dot;
        }, this);

        if (instruction.axis === 'x') {
            this.COLS = instruction.value;
        } else {
            this.ROWS = instruction.value;
        }

        this.currentInstructionIndex++;
    }

    public print(paper: number[][] = this.original, width: number = this.COLS, height: number = this.ROWS): void {

        let output = '';
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                output += this.visible.has(x + ',' + y) ? '# ' : '. ';
            }
            output += '\n';
        }

        console.log(output);
    }
}


// ====================================================================================
// === DAY 11 ==========================================================================

export function parse(lines: string[]): TransparentPaper {

    const coordinates: number[][] = [];
    const instructions: FoldInstruction[] = [];

    let lineIsCoordinate = true;
    for (let line of lines) {

        if (line === "") {
            lineIsCoordinate = false;
            continue;
        }

        if (lineIsCoordinate) {
            const dot = parseCoordinate(line);
            coordinates.push(dot);
        } else {
            const instruction = parseInstruction(line);
            instructions.push(instruction);
        }
    }

    return new TransparentPaper(coordinates, instructions);
}

function parseCoordinate(coordString: string): number[] {
    return coordString.split(',').map(x => parseInt(x));
}

function parseInstruction(instructionString: string): FoldInstruction {
    const [dir, val] = instructionString
        .split(' ')[2]
        .split('=');

    return {axis: dir, value: parseInt(val)} as FoldInstruction;
}


export function part1(transparentPaper: TransparentPaper): number {
    transparentPaper.fold();
    return transparentPaper.numberOfVisibleDots;
}

export function part2(transparentPaper: TransparentPaper): void {
    transparentPaper.foldAll();
    transparentPaper.print();
}

export function main(lines: string[], day: number): void {

    let transparentPaper;

    console.log(`--- Day ${day}: Transparent Origami ---`)
    console.log();

    transparentPaper = parse(lines);
    let [result, ms] = TimeUtils.measure(part1, transparentPaper);
    console.log("  > Visible dots after one fold:  ", result, " [", ms, "ms]");

    console.log("  > Code: \n");

    transparentPaper = parse(lines);
    TimeUtils.measure(part2, transparentPaper);

    console.log();
}