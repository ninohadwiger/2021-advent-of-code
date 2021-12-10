import {ArrayUtils} from "../../utils/array.utils";

export class BingoBoard {

    private readonly cols: number;
    private readonly rows: number;

    private readonly marked: number[][];

    private indices: Map<number, number[]> = new Map();
    private reverseIndex: Map<string, number> = new Map();
    private processedNumbers: number[] = [];

    constructor(private numbers: number[][]) {
        this.cols = numbers[0].length;
        this.rows = numbers.length;

        this.marked = ArrayUtils.createAndFillMatrix(this.rows, this.cols, 0);
        this.indices = BingoBoard.getIndicesMap(numbers);
        this.reverseIndex = BingoBoard.getReverseIndicesMap(numbers);
    }

    private _bingo = false;

    get bingo(): boolean {
        return this._bingo;
    }

    get lastProcessedNumber(): number {
        return this.processedNumbers.at(-1);
    }

    private static getIndicesMap(numbers: number[][]) {

        const indices: Map<number, number[]> = new Map();
        for (let row = 0; row < numbers.length; ++row) {
            for (let col = 0; col < numbers[0].length; ++col) {
                indices.set(numbers[row][col], [row, col]);
            }
        }
        return indices;
    }

    private static getReverseIndicesMap(numbers: number[][]) {

        const reverse: Map<string, number> = new Map();
        for (let row = 0; row < numbers.length; ++row) {
            for (let col = 0; col < numbers[0].length; ++col) {
                reverse.set(`${row},${col}`, numbers[row][col]);
            }
        }
        return reverse;
    }

    public markNumber(num: number): boolean {

        if (this.indices.has(num)) {
            const [row, col] = this.indices.get(num);
            this.marked[row][col] = 1;
            this.processedNumbers.push(num);

            return this.checkBingo(row, col);
        }

    }

    public calculateSumOfUnmarkedNumbers(): number {

        let sum = 0;
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                if (!this.marked[row][col]) {
                    sum += this.reverseIndex.get(`${row},${col}`);
                }
            }
        }

        return sum;

    }

    private checkBingo(row: number, col: number): boolean {

        let rowBingo = true;
        for (let r = 0; r < this.rows; ++r) {
            if (!this.marked[r][col]) {
                rowBingo = false;
                break;
            }
        }

        let colBingo = true;
        for (let c = 0; c < this.cols; ++c) {
            if (!this.marked[row][c]) {
                colBingo = false;
                break;
            }
        }

        this._bingo = rowBingo || colBingo;

        return this._bingo;

    }


}

function parseNumbers(line: string): number[] {
    return line.split(',').map(str => +str)
}

function parseBoards(lines: string[]): BingoBoard[] {
    let boards = [];

    for (let i = 0; i < lines.length; i += 6) {

        let board = [];
        for (let j = i; j < (i + 5); ++j) {

            const currLine = lines[j]
                .replace(/\s\s+/g, ' ')
                .replace(/^\s+/g, '')
                .split(" ")
                .map(str => +str);

            board.push(currLine);
        }
        const bingoBoard = new BingoBoard(board);
        boards.push(bingoBoard);
    }

    return boards;
}

function playBingo(numbers: number[], boards: BingoBoard[]): BingoBoard[] {
    let wins: BingoBoard[] = [];
    for (let num of numbers) {

        for (let board of boards) {

            if (board.bingo)
                continue;

            board.markNumber(num)

            if (board.bingo)
                wins.push(board);
        }
    }
    return wins;
}

export function parse(lines: string[]): { numbers: number[], boards: BingoBoard[] } {

    let numbers = parseNumbers(lines[0]);
    let boards = parseBoards(lines.slice(2));

    return {numbers, boards}
}

export function part1(numbers: number[], boards: BingoBoard[]): number {

    let wins = playBingo(numbers, boards);
    let firstWinner = wins[0];

    return firstWinner.lastProcessedNumber * firstWinner.calculateSumOfUnmarkedNumbers();

}

export function part2(numbers: number[], boards: BingoBoard[]): number {

    let wins = playBingo(numbers, boards);
    let lastWinner = wins[wins.length - 1];

    return lastWinner.lastProcessedNumber * lastWinner.calculateSumOfUnmarkedNumbers();
}

export function main(lines: string[], day: number): void {

    console.log(`--- Day ${day}: Giant Squid ---`)

    console.log();

    let {numbers, boards} = parse(lines);
    let result = part1(numbers, boards);
    console.log("  > Part I:  ", result);

    ({numbers, boards} = parse(lines));
    let result2 = part2(numbers, boards);
    console.log("  > Part II: ", result2);

    console.log();
}