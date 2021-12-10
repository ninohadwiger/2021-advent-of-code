import {ArrayUtils} from "../../utils/array.utils";

export type Vent = number[];
export type VentLine = Vent[];

export class OceanFloor {

    private readonly width: number;
    private readonly height: number;

    private readonly oceanFloor: number[][];

    constructor(ventLines: VentLine[], includingDiagonals = false) {

        // find width and height of ocean floor
        [this.width, this.height] = OceanFloor.findSizeOfOceanFloor(ventLines);

        // fill ocean floor with 0s
        this.oceanFloor = OceanFloor.createOceanFloor(this.width, this.height);

        // mark lines
        this.drawLines(ventLines, includingDiagonals);
    }

    private static createOceanFloor(width: number, height: number): number[][] {
        return ArrayUtils.createAndFillMatrix(height, width, 0);
    }

    private static findSizeOfOceanFloor(ventLines: VentLine[]): number[] {

        let maxX = 0, maxY = 0;

        for (let ventLine of ventLines) {
            for (let [x, y] of ventLine) {
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }

        // since a vent consists of coordinates
        // we have to add 1 to the x and y coordinate
        return [maxX + 1, maxY + 1];
    }

    private static isHorizontalLine(from: Vent, to: Vent): boolean {
        const [, y1] = from, [, y2] = to;
        return y1 === y2;
    }

    private static isVerticalLine(from: Vent, to: Vent): boolean {
        const [x1,] = from, [x2,] = to;
        return x1 === x2;
    }

    private static isDiagonalLine(from: Vent, to: Vent): boolean {
        const [x1, y1] = from, [x2, y2] = to;
        return Math.abs(x1 - x2) === Math.abs(y1 - y2);
    }

    public drawLines(ventLines: VentLine[], includingDiagonals: boolean): void {

        for (let [from, to] of ventLines) {

            let [x1, y1] = from,
                [x2, y2] = to;

            // diagonal line
            if (includingDiagonals && OceanFloor.isDiagonalLine(from, to)) {

                // check if left -> right or left <- right
                const xOp = x1 < x2 ? 1 : -1;

                // check if top -> bottom or top <- bottom
                const yOp = y1 < y2 ? 1 : -1;

                for (let d = 0; d <= Math.abs(x1 - x2); ++d) {
                    this.oceanFloor[y1 + (d * yOp)][x1 + (d * xOp)] += 1;
                }

                continue;
            }

            // vertical line
            if (OceanFloor.isVerticalLine(from, to)) {
                for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); ++y) {
                    this.oceanFloor[y][x1] += 1;
                }
                continue;
            }

            // horizontal line
            if (OceanFloor.isHorizontalLine(from, to)) {
                for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); ++x) {
                    this.oceanFloor[y1][x] += 1;
                }
            }
        }
    }

    public calculateNumberOfDangerousAreas(threshold: number): number {

        let dangerousAreas = 0;

        for (let row = 0; row < this.height; ++row) {
            for (let col = 0; col < this.width; ++col) {
                if (this.oceanFloor[row][col] >= threshold)
                    dangerousAreas += 1;
            }
        }

        return dangerousAreas;
    }
}


export function parse(lines: string[]): VentLine[] {
    let ventLines = [];

    for (let line of lines) {
        let ventLine = line
            // 0,9 -> 5,9   =>   ['0,9', '5,9']
            .split(' -> ')
            .map(l => l
                // '0,9'   =>   ['0', '9']
                .split(',')
                .map(val => +val));

        ventLines.push(ventLine)
    }

    return ventLines;
}

export function part1(ventLines: VentLine[]): number {
    const oceanFloor = new OceanFloor(ventLines);
    return oceanFloor.calculateNumberOfDangerousAreas(2);
}

export function part2(ventLines: VentLine[]): number {
    const oceanFloor = new OceanFloor(ventLines, true);
    return oceanFloor.calculateNumberOfDangerousAreas(2);
}

export function main(lines: string[], day: number): void {

    console.log(`--- Day ${day}: Hydrothermal Venture ---`)
    console.log();

    let ventLines = parse(lines);
    let result = part1(ventLines);
    console.log("  > Number of dangerous areas:  ", result);

    let ventLines2 = parse(lines);
    let result2 = part2(ventLines2);
    console.log("  > Number of dangerous areas:  ", result2);

    console.log();
}