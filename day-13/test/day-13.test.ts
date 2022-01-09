import {FileUtils} from "../../utils/file.utils";
import {FoldInstruction, parse, part1, TransparentPaper} from "../src/day-13";
import path from "node:path";

const exampleDataPath = path.join(__dirname, '..') + '/assets/example.in';

let lines: string[];
let transparentPaper: TransparentPaper;

beforeEach(() => {
    lines = FileUtils.getLinesOfFile(exampleDataPath);
    transparentPaper = parse(lines);
});

test(`Day  13 - Parse Lines`, () => {

    const coords = [
        [6, 10], [0, 14], [9, 10], [0, 3], [10, 4], [4, 11], [6, 0], [6, 12], [4, 1], [0, 13], [10, 12], [3, 4], [3, 0], [8, 4], [1, 10], [2, 14], [8, 10], [9, 0]
    ]

    const instructs: FoldInstruction[] = [
        {axis: 'y', value: 7},
        {axis: 'x', value: 5},
    ];

    const expectedTransparentPaper = new TransparentPaper(coords, instructs);

    expect(transparentPaper).toEqual(expectedTransparentPaper);
});

test(`Day 13 - Part I`, () => {

    const expectedNumberOfVisibleDots = 17;

    const result = part1(transparentPaper);

    expect(result).toBe(expectedNumberOfVisibleDots);
});