import {FileUtils} from "../../utils/file.utils";
import {parse, part1, part2} from "../src/day-07";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let positions: number[];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    positions = parse(lines);
});

test(`Day 7 - Parse Lines`, () => {

    const expected = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

    expect(positions).toHaveLength(expected.length);
    expect(positions).toEqual(expected);
});

test(`Day 7 - Part I`, () => {

    const expectedFuel = 37;

    const result = part1(positions);

    expect(result).toBe(expectedFuel);
});

test(`Day 7 - Part II`, () => {

    const expectedFuel = 168;

    const result = part2(positions);

    expect(result).toBe(expectedFuel);
});