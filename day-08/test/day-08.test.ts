import {FileUtils} from "../../utils/file.utils";
import {NoteEntry, parse, part1, part2} from "../src/day-08";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let entries: NoteEntry[];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    entries = parse(lines);
});

test(`Day 8 - Parse Lines`, () => {

    const expectedSignalPattern = [['b', 'e'], ['c', 'f', 'b', 'e', 'g', 'a', 'd'], ['c', 'b', 'd', 'g', 'e', 'f'], ['f', 'g', 'a', 'e', 'c', 'd'], ['c', 'g', 'e', 'b'], ['f', 'd', 'c', 'g', 'e'], ['a', 'g', 'e', 'b', 'f', 'd'], ['f', 'e', 'c', 'd', 'b'], ['f', 'a', 'b', 'c', 'd'], ['e', 'd', 'b']];
    const expectedOutputValue = [['f', 'd', 'g', 'a', 'c', 'b', 'e'], ['c', 'e', 'f', 'd', 'b'], ['c', 'e', 'f', 'b', 'g', 'd'], ['g', 'c', 'b', 'e']];

    const {signalPattern, outputValue} = entries[0];

    expect(entries).toHaveLength(10);

    expect(signalPattern).toEqual(expectedSignalPattern);
    expect(outputValue).toEqual(expectedOutputValue);
});

test(`Day 8 - Part I`, () => {

    const expectedNumberOfSegments = 26;

    const result = part1(entries);

    expect(result).toBe(expectedNumberOfSegments);
});

test(`Day 8 - Part II`, () => {

    const expectedFuel = 61229;

    const result = part2(entries);

    expect(result).toBe(expectedFuel);
});