import {FileUtils} from "../../utils/file.utils";
import {part1, part2} from "../src/day-10";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
});

test(`Day  10 - Parse Lines`, () => {

    const expectedLines = [
        '[({(<(())[]>[[{[]{<()<>>',
        '[(()[<>])]({[<{<<[]>>(',
        '{([(<{}[<>[]}>{[]{[(<()>',
        '(((({<>}<{<{<>}{[]{[]{}',
        '[[<[([]))<([[{}[[()]]]',
        '[{[{({}]{}}([{[{{{}}([]',
        '{<[[]]>}<{[{[{[]{()[[[]',
        '[<(<(<(<{}))><([]([]()',
        '<{([([[(<>()){}]>(<<{{',
        '<{([{{}}[<[[[<>{}]]]>[]]',
    ];


    expect(lines).toHaveLength(expectedLines.length);
    expect(lines).toEqual(expectedLines);
});

test(`Day 10 - Part I`, () => {

    const errorScore = (2 * 3) + 57 + 1197 + 25137;

    const result = part1(lines);

    expect(result).toBe(errorScore);
});

test(`Day 10 - Part II`, () => {

    const middleScore = 288957;

    const result = part2(lines);

    expect(result).toBe(middleScore);
});