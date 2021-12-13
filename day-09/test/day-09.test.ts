import {FileUtils} from "../../utils/file.utils";
import {parse, part1, part2} from "../src/day-09";
import path from "node:path";
import {ArrayUtils} from "../../utils/array.utils";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let heightmap: number[][];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    heightmap = parse(lines);
});

test(`Day 9 - Parse Lines`, () => {

    const expectedHeightMap = [
        [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
        [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
        [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
        [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
        [9, 8, 9, 9, 9, 6, 5, 6, 7, 8]
    ];


    expect(heightmap).toHaveLength(5);
    expect(heightmap).toEqual(expectedHeightMap);
});

test(`Day 9 - Part I`, () => {

    const sumOfRiskLevels = 15;

    const result = part1(heightmap);

    expect(result).toBe(sumOfRiskLevels);
});

test(`Day 9 - Part II - DFS`, () => {

    const sizeOfThreeLargestBasins = [9, 14, 9];
    const expectedMultipliedSizeOfThreeLargestBasins =
        sizeOfThreeLargestBasins.reduce(ArrayUtils.multiply);

    const DFSTraverseType = 0;
    const result = part2(heightmap, DFSTraverseType);

    expect(result).toBe(expectedMultipliedSizeOfThreeLargestBasins);
});

test(`Day 9 - Part II - BFS`, () => {

    const sizeOfThreeLargestBasins = [9, 14, 9];
    const expectedMultipliedSizeOfThreeLargestBasins =
        sizeOfThreeLargestBasins.reduce(ArrayUtils.multiply);

    const BFSTraverseType = 1;
    const result = part2(heightmap, BFSTraverseType);

    expect(result).toBe(expectedMultipliedSizeOfThreeLargestBasins);
});