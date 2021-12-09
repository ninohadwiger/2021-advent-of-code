import {parse, part1, part2} from "../src/day-03";
import {FileUtils} from "../../utils/file.utils";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let input: string[];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    input = parse(lines);
})

test(`Day 3 - Parse`, () => {
    const expected = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010'
    ];

    expect(input).toHaveLength(expected.length);
    expect(input).toEqual(expected);
});

test(`Day 3 - Part I`, () => {
    const result = part1(input);
    const gammaRate = 22;
    const epsilonRate = 9;
    expect(result).toBe(gammaRate * epsilonRate);
});

test(`Day 3 - Part II`, () => {
    const result = part2(input);
    const oxygenGeneratorRating = 23;
    const co2ScrubberRating = 10;
    expect(result).toBe(oxygenGeneratorRating * co2ScrubberRating);
});