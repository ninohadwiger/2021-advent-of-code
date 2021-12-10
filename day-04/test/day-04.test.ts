import {FileUtils} from "../../utils/file.utils";
import {BingoBoard, parse, part1, part2} from "../src/day-04";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let numbers: number[];
let boards: BingoBoard[]

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    ({numbers, boards} = parse(lines));
});

test(`Day 4 - Parse Lines`, () => {

    const expectedLines = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];

    expect(numbers).toHaveLength(expectedLines.length);
    expect(numbers).toEqual(expectedLines);
});

test(`Day 4 - Part I`, () => {
    const result = part1(numbers, boards);
    const lastNumber = 24;
    const sumOfUnmarkedNumbers = 188;
    expect(result).toBe(lastNumber * sumOfUnmarkedNumbers);
});

test(`Day 4 - Part II`, () => {
    const result = part2(numbers, boards);
    const lastNumber = 13;
    const sumOfUnmarkedNumbers = 148;
    expect(result).toBe(lastNumber * sumOfUnmarkedNumbers);
});