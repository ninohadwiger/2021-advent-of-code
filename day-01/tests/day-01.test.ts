import {parse, part1, part2} from "../src/day-01";
import {FileUtils} from "../../utils/file.utils";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let input: number[];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    input = parse(lines);
})

test(`Day 1 - Parse`, () => {
    const expected = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

    expect(input).toHaveLength(expected.length);
    expect(input).toEqual(expected);
});

test('Day 1 - Part I', () => {
    const count = part1(input);
    expect(count).toBe(7);
});

test('Day 1 - Part II', () => {
    const count = part2(input);
    expect(count).toBe(5);
});