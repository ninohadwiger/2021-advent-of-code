function countNumberOfIncreases(measurements: number[]): number {
    let count = 0;
    let prev = undefined;

    for (let mes of measurements) {
        if (mes > prev) count++;
        prev = mes;
    }

    return count;
}

function countNumberOfIncreasesWithSlidingWindow(measurements: number[]): number {

    let count = 0;
    let prev = undefined;

    for (let i = 2; i < measurements.length; ++i) {

        let sum = measurements[i-2] + measurements[i-1] + measurements[i];
        if (sum > prev) count++;
        prev = sum;
    }

    return count;
}

export function parse(lines: string[]): number[] {
    return lines.map(line => +line);
}

export function part1(measurements: number[]): number {
    return countNumberOfIncreases(measurements);
}

export function part2(measurements: number[]): number {
    return countNumberOfIncreasesWithSlidingWindow(measurements);
}

export function main(lines: string[]): void {

    const measurements = lines.map(line => +line);

    console.log('--- Day 1: Sonar Sweep ---')
    console.log()

    let count = countNumberOfIncreases(measurements);
    console.log("  > Part I:  ", count);

    count = countNumberOfIncreasesWithSlidingWindow(measurements);
    console.log("  > Part II: ", count);

    console.log()
}