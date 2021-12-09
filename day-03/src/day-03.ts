function getPowerConsumption(bits: string[]): number {

    let gammaRate = '';

    for (let i = 0; i < bits[0].length; ++i) {
        gammaRate += findMostCommonValue(bits, i);
    }

    const epsilonRate: string = getInverseRate(gammaRate);

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function getInverseRate(bits: string): string {
    return bits
        .split("")
        .map(bit => bit === '0' ? '1' : '0')
        .join("");
}

function getLifeSupportRating(bits: string[]): number {

    const oxygenGeneratorRating = findOxygenGeneratorRating(bits);
    const CO2ScrubberRating = findCO2ScrubberRating(bits);

    return parseInt(oxygenGeneratorRating, 2) * parseInt(CO2ScrubberRating, 2);
}

function findOxygenGeneratorRating(bits: string[], index = 0): string {

    // base case
    if (bits.length === 1) {
        return bits[0];
    }

    if (bits.length < 0 || (bits.length > 0 && index > bits[0].length)) {
        throw new Error();
    }

    const bitCriteria = findMostCommonValue(bits, index);
    const filtered = bits.filter(bit => bit[index] === bitCriteria);

    return findOxygenGeneratorRating(filtered, ++index);
}

function findCO2ScrubberRating(bits: string[], index = 0): string {
    // base case
    if (bits.length === 1) {
        return bits[0];
    }

    if (bits.length < 0 || (bits.length > 0 && index > bits[0].length)) {
        throw new Error();
    }

    const bitCriteria = findLeastCommonValue(bits, index);
    const filtered = bits.filter(bit => bit[index] === bitCriteria);

    return findCO2ScrubberRating(filtered, ++index);
}

function findCommonValue(bits: string[], index: number, func: (a, b) => string): string {
    const map = new Map([['1', 0], ['0', 0]]);

    for (let bit of bits) {
        map.set(bit[index], map.get(bit[index]) + 1);
    }

    return func(map.get('0'), map.get('1'));
}

const findMostCommonValue = (bits: string[], index: number) => findCommonValue(bits, index, (a, b) => a > b ? '0' : '1');
const findLeastCommonValue = (bits: string[], index: number) => findCommonValue(bits, index, (a, b) => a <= b ? '0' : '1');

export function parse(lines: string[]): string[] {
    return lines;
}

export function part1(commands: string[]): number {
    return getPowerConsumption(commands);
}

export function part2(commands: string[]): number {
    return getLifeSupportRating(commands);
}

export function main(lines: string[], day: number): void {

    console.log(`--- Day ${day}: Binary Diagnostic ---`);
    console.log();

    const result = getPowerConsumption(lines);
    console.log("  > Power consumption:   ", result);

    const lifeSupportRating = getLifeSupportRating(lines);
    console.log("  > Life Support Rating: ", lifeSupportRating);

    console.log();
}