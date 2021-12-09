import {parse, part1, part2} from "../src/day-02";
import {FileUtils} from "../../utils/file.utils";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let input: string[];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    input = parse(lines);
})

test(`Day 2 - Parse`, () => {
    const expected = [
        'forward 5',
        'down 5',
        'forward 8',
        'up 3',
        'down 8',
        'forward 2'
    ];

    expect(input).toHaveLength(expected.length);
    expect(input).toEqual(expected);
});

test(`Day 2 - Part I`, () => {
    const result = part1(input);
    expect(result).toBe(150);
});

test(`Day 2 - Part II`, () => {
    const result = part2(input);
    expect(result).toBe(900);
});