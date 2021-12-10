import {ArrayUtils} from "../../utils/array.utils";

export function parse(lines: string[]): number[] {
    return lines[0].split(',').map(fish => +fish);
}

export function part1(fishes: number[], numberOfDays: number): number {

    const MAX_AGE = 8;
    const RESPAWN_AGE = 6;

    // this array represents the number of fishes per age (= index)
    const fishCount = ArrayUtils.createAndFillArray(MAX_AGE + 1, 0);

    // update fishCount
    for (let fish of fishes)
        fishCount[fish] += 1;

    // simulate days
    for (let day = 1; day <= numberOfDays; ++day) {

        let numberOfNewSpawningLanternFishes = fishCount[0];

        for (let i = 0; i < MAX_AGE; ++i) {
            // shift fishes to left -> reduce age by one
            fishCount[i] = fishCount[i + 1];

            // add respawned lantern fishes with age 6
            if (i == RESPAWN_AGE)
                fishCount[i] += numberOfNewSpawningLanternFishes;
        }

        // set new spawned lantern fishes
        fishCount[MAX_AGE] = numberOfNewSpawningLanternFishes;
    }

    //     calculate total fish count
    return fishCount.reduce(ArrayUtils.sum);
}

export function part2(fishes: number[], numberOfDays: number): number {
    return part1(fishes, numberOfDays);
}

export function main(lines: string[], day: number): void {

    console.log(`--- Day ${day}: Lanternfish ---`)
    console.log();

    let numberOfDays = 80;

    let fishes = parse(lines);
    let result = part1(fishes, numberOfDays);
    console.log("  > Number of lanternfishes:  ", result);

    numberOfDays = 256;
    let fishes2 = parse(lines);
    let result2 = part2(fishes2, numberOfDays);
    console.log("  > Number of lanternfishes:  ", result2);

    console.log();
}