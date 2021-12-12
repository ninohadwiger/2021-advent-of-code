import {ArrayUtils} from "../../utils/array.utils";
import {TimeUtils} from "../../utils/time.utils";

function calcPartialSum(n: number): number {
    return (n * (n + 1)) / 2;
}

function calculateTotalFuelConsumptionForPosition(positions: number[], position: number): number {

    let totalFuel = 0;

    for (let pos of positions)
        totalFuel += calcPartialSum(Math.abs(position - pos));

    return totalFuel;
}

function calcFuelConsumptionRec(positions: number[], position: number, currentFuelAmount: number, nextPosition: number): number {


    // check if fuel consumption would be lower next position
    let fuelAmountOfNextPosition = calculateTotalFuelConsumptionForPosition(positions, position + nextPosition);
    if (fuelAmountOfNextPosition < currentFuelAmount) {
        return calcFuelConsumptionRec(positions, position + nextPosition, fuelAmountOfNextPosition, nextPosition)
    }

    // current position is position with lowest fuel consumption
    return currentFuelAmount;
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

/**
 * Optimized version of calculating the total fuel consumption for the optimal position.
 *
 * This version calculates the current fuel consumption for the average position and compares
 * it with the consumption of the positions above and below recursively.
 */
export function part2(positions: number[]): number {

    let sum = positions.reduce(ArrayUtils.sum);
    let avg = Math.round(sum / positions.length);

    let fuel = calculateTotalFuelConsumptionForPosition(positions, avg);

    // compare current fuel consumption with positions above and below
    let above = calcFuelConsumptionRec(positions, avg, fuel, 1);
    let below = calcFuelConsumptionRec(positions, avg, fuel, -1);

    return Math.min(above, below);
}

/**
 * Brute force version of calculating the total fuel consumption for the optimal position.
 *
 * This version calculates the total fuel consumption for each position and returns the minimum.
 */
export function part2_bruteForce(positions: number[]): number {

    let totalFuel = Infinity;
    let max = positions.reduce(ArrayUtils.max);

    for (let i = 0; i <= max; ++i) {
        const currFuelConsumption = calculateTotalFuelConsumptionForPosition(positions, i);
        totalFuel = Math.min(totalFuel, currFuelConsumption);
    }

    return totalFuel;
}

export function main(lines: string[], day: number): void {

    let positions: number[];

    console.log(`--- Day ${day}: The Treachery of Whales ---`)
    console.log();

    positions = parse(lines);
    let result = part1(positions);
    console.log("  > Total fuel consumption:  ", result);

    positions = parse(lines);
    let [result2, ms2] = TimeUtils.measure(part2_bruteForce, positions);
    console.log("  > Total fuel consumption (brute force):  ", result2, " [", ms2, "ms]");

    positions = parse(lines);
    let [result3, ms3] = TimeUtils.measure(part2, positions);
    console.log("  > Total fuel consumption (optimized):    ", result3, " [", ms3, "ms]");

    console.log();
}