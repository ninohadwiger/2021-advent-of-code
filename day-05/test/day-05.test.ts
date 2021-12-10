import {FileUtils} from "../../utils/file.utils";
import {parse, part1, part2} from "../src/day-05";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let ventLines: number[][][];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    ventLines = parse(lines);
});

test(`Day 5 - Parse Lines`, () => {

    const expectedLines = [
        [[0, 9], [5, 9]],
        [[8, 0], [0, 8]],
        [[9, 4], [3, 4]],
        [[2, 2], [2, 1]],
        [[7, 0], [7, 4]],
        [[6, 4], [2, 0]],
        [[0, 9], [2, 9]],
        [[3, 4], [1, 4]],
        [[0, 0], [8, 8]],
        [[5, 5], [8, 2]]
    ];

    expect(ventLines).toHaveLength(expectedLines.length);
    expect(ventLines).toEqual(expectedLines);
});

test(`Day 5 - Part I`, () => {

    const numberOfDangerousAreas = 5;

    const result = part1(ventLines);

    expect(result).toBe(numberOfDangerousAreas);
});

test(`Day 5 - Part II`, () => {

    const numberOfDangerousAreas = 12;

    const result = part2(ventLines);

    expect(result).toBe(numberOfDangerousAreas);
});