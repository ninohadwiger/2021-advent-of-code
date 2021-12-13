import {TimeUtils} from "../../utils/time.utils";
import {ArrayUtils} from "../../utils/array.utils";

enum TraverseType {
    DFS, BFS
}

function isRowInbound(heightMap: number[][], row: number): boolean {
    return 0 <= row && row < heightMap.length;
}

function isColInbound(heightMap: number[][], col: number): boolean {
    return 0 <= col && col < heightMap[0].length;
}

function isValidPoint(heightMap: number[][], row: number, col: number): boolean {
    const isValidRow = isRowInbound(heightMap, row)
    const isValidCol = isColInbound(heightMap, col);

    return isValidRow && isValidCol;
}

// ====================================================================================
// === PART I =========================================================================

function isLowPoint(heightMap: number[][], row: number, col: number): boolean {

    // check all neighbours
    let d = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let [r, c] of d) {
        const isLower = isLowerThanNeighbour(heightMap, row + r, col + c, heightMap[row][col])
        if (!isLower)
            return false;
    }

    return true;
}

function isLowerThanNeighbour(heightMap: number[][], row: number, col: number, height: number): boolean {

    if (!isValidPoint(heightMap, row, col))
        return true;

    const neighbour = heightMap[row][col];
    return height < neighbour;
}

function findLowPoints(heightMap: number[][]): number[] {

    const lowPoints: number[] = [];
    for (let row = 0; row < heightMap.length; ++row) {
        for (let col = 0; col < heightMap[0].length; ++col) {

            if (isLowPoint(heightMap, row, col)) {
                lowPoints.push(heightMap[row][col]);
            }
        }
    }

    return lowPoints;
}

function calculateSumOfRiskLevels(lowPoints: number[]): number {
    return lowPoints.map(point => point + 1).reduce(ArrayUtils.sum);
}

// ====================================================================================
// === PART II ========================================================================

function exploreBasinDFS(heightMap: number[][], row: number, col: number, visited: Set<string>): number[][] | null {

    // check if valid point
    if (!isValidPoint(heightMap, row, col))
        return null;

    // check if is 9
    if (heightMap[row][col] === 9)
        return null;

    let point = `${row},${col}`;

    // check if already visited
    if (visited.has(point))
        return null;

    visited.add(point);

    let basins = [[row, col]];

    // visit neighbours
    let d = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let [r, c] of d) {
        basins.push(...exploreBasinDFS(heightMap, row + r, col + c, visited));
    }

    return basins;
}

function exploreBasinBFS(heightMap: number[][], row: number, col: number, visited: Set<string>): number[][] {

    let queue = [[row, col]];
    let basinPoints = [];
    visited.add(`${row},${col}`);

    while (queue.length > 0) {

        let curr = queue.shift();
        basinPoints.push(curr);

        let [currRow, currCol] = curr;


        let d = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for (let [r, c] of d) {

            // check if valid point
            if (!isValidPoint(heightMap, currRow + r, currCol + c))
                continue;

            // check if is 9
            if (heightMap[currRow + r][currCol + c] === 9)
                continue;

            let point = `${currRow + r},${currCol + c}`;

            // check if already visited
            if (visited.has(point))
                continue;

            visited.add(point);

            queue.push([currRow + r, currCol + c]);
        }
    }

    return basinPoints;

}

function findBasins(heightMap: number[][], traverseType = TraverseType.DFS): number[][][] {

    let visited = new Set<string>();
    let basins = [];

    for (let row = 0; row < heightMap.length; ++row) {
        for (let col = 0; col < heightMap[0].length; ++col) {

            if (heightMap[row][col] !== 9) {
                let basin = traverseType == TraverseType.BFS ?
                    exploreBasinBFS(heightMap, row, col, visited) :
                    exploreBasinDFS(heightMap, row, col, visited);
                if (basin) {
                    basins.push(basin.filter(point => !!point));
                }
            }
        }
    }

    return basins;
}

// ====================================================================================
// === DAY 9 ==========================================================================

export function parse(lines: string[]): number[][] {
    return lines.map(line => line
        .split('')
        .map(height => parseInt(height)));
}

export function part1(heightMap: number[][]): number {
    const lowPoints = findLowPoints(heightMap);
    return calculateSumOfRiskLevels(lowPoints);
}

export function part2(heightMap: number[][], traverseType = TraverseType.DFS): number {

    const k = 3;

    const basins = findBasins(heightMap, traverseType);
    const sizes = basins.map(basin => basin.length).sort((a, b) => b - a);
    const kLargest = sizes.length < k ? sizes : sizes.slice(0, k);

    return kLargest.reduce(ArrayUtils.multiply);
}

export function main(lines: string[], day: number): void {

    let heightMap: number[][];

    console.log(`--- Day ${day}: Smoke Basin ---`)
    console.log();

    heightMap = parse(lines);
    let [result, ms] = TimeUtils.measure(part1, heightMap);
    console.log("  > Sum of risk levels: ", result, " [", ms, "ms]");

    heightMap = parse(lines);
    let [result2, ms2] = TimeUtils.measure(part2, heightMap, TraverseType.DFS);
    console.log("  > Result (DFS): ", result2, " [", ms2, "ms]");

    heightMap = parse(lines);
    let [result3, ms3] = TimeUtils.measure(part2, heightMap, TraverseType.BFS);
    console.log("  > Result (BFS): ", result3, " [", ms3, "ms]");

    console.log();
}