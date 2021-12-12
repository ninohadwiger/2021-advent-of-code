import {ArrayUtils} from "../../utils/array.utils";

function calcPartialSum(n: number): number {
    return (n * (n + 1)) / 2;
}

function calculateTotalFuelConsumption(positions: number[], position: number): number {

    let totalFuel = 0;

    for (let pos of positions)
        totalFuel += calcPartialSum(Math.abs(position - pos));

    return totalFuel;
}

export function parse(lines: string[]): number[] {
    return lines[0].split(',').map(position => +position);
}

export function part1(positions: number[]): number {
    let totalFuel = 0;

    let sorted = positions.sort((a, b) => a - b);
    let median = sorted[Math.round(sorted.length / 2)];

    for (let pos of positions)
        totalFuel += Math.abs(median - pos);

    return totalFuel;
}

export function part2(positions: number[]): number {

    let totalFuel = Infinity;
    let max = positions.reduce(ArrayUtils.max);

    for (let i = 0; i <= max; ++i) {
        const currFuelConsumption = calculateTotalFuelConsumption(positions, i);
        totalFuel = Math.min(totalFuel, currFuelConsumption);
    }

    return totalFuel;
}

export function main(lines: string[], day: number): void {

    const positions = parse(lines);

    console.log(`--- Day ${day}: The Treachery of Whales ---`)
    console.log();

    let result = part1(positions);
    console.log("  > Total fuel consumption:  ", result);

    let result2 = part2(positions);
    console.log("  > Total fuel consumption:  ", result2);

    console.log();
}