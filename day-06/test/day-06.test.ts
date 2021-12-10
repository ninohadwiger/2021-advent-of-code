import {FileUtils} from "../../utils/file.utils";
import {parse, part1, part2} from "../src/day-06";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let fishes: number[];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    fishes = parse(lines);
});

test(`Day 6 - Parse Lines`, () => {

    const expected = [3, 4, 3, 1, 2];

    expect(fishes).toHaveLength(expected.length);
    expect(fishes).toEqual(expected);
});

test(`Day 6 - Part I - after 18 days`, () => {

    const numberOfLanternFishes = 26;

    const numberOfDays = 18;
    const result = part1(fishes, numberOfDays);

    expect(result).toBe(numberOfLanternFishes);
});

test(`Day 6 - Part I - after 80 days`, () => {

    const numberOfLanternFishes = 5934;

    const numberOfDays = 80;
    const result = part1(fishes, numberOfDays);

    expect(result).toBe(numberOfLanternFishes);
});

test(`Day 6 - Part II - after 256 days`, () => {

    const numberOfLanternFishes = 26984457539;

    const numberOfDays = 256;
    const result = part2(fishes, numberOfDays);

    expect(result).toBe(numberOfLanternFishes);
});