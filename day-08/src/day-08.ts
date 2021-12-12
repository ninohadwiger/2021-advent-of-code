import {TimeUtils} from "../../utils/time.utils";

type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
type Digit = Segment[];

type SignalPattern = [Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit];
type OutputValue = [Digit, Digit, Digit, Digit];

export type NoteEntry = { signalPattern: SignalPattern, outputValue: OutputValue };

export class SevenSegmentDisplay {

    private digitMapping = new Map<string, number>();
    private reverseDigitMapping = new Map<number, string>();

    constructor(pattern: Digit[]) {
        this.initMap(pattern);
    }

    public decode(digits: Digit[]): number {
        let output = '';
        for (let digit of digits) {
            let sorted = digit.sort().join('');
            let num = this.digitMapping.get(sorted);
            output += num.toString();
        }

        return parseInt(output);
    }

    private initMap(patterns: Digit[]) {

        // Attention: Order of handlers is important,
        //   since some of them depend on others.

        // ========================================
        // handle all patterns with unique length (digits 1, 4, 7 and 8)

        for (let pattern of patterns) {

            switch (pattern.length) {
                case 2:
                    this.storePattern(pattern, 1);
                    break;
                case 4:
                    this.storePattern(pattern, 4);
                    break;
                case 3:
                    this.storePattern(pattern, 7);
                    break;
                case 7:
                    this.storePattern(pattern, 8);
                    break;
            }
        }

        // ========================================
        // handle all patterns with length 6 (digits 9, 0 and 6)

        // step 1 - handle 9 [length: 6, includes: 4]
        this.handleNine(patterns);

        // step 2 - handle 0 [length: 6, includes: 7]
        this.handleZero(patterns);

        // step 3 - handle 6 [length: 6, remaining]
        this.handleSix(patterns);

        // ========================================
        // handle all patterns with length 5 (digits 3, 5 and 2)

        // step 4 - handle 3  [length: 5, includes: 1]
        this.handleThree(patterns);

        // step 5 - handle 5 [length: 5, includes: 9]
        this.handleFive(patterns);

        // step 6 - handle 2 [length: 5, remaining]
        this.handleTwo(patterns);
    }

    private storePattern(pattern: Digit, num: number): void {
        const sortedPatternString = pattern.sort().join('');
        this.digitMapping.set(sortedPatternString, num);
        this.reverseDigitMapping.set(num, sortedPatternString);
    }

    private handleZero(patterns: Digit[]) {
        let length6 = this.getNotYetStoredPattern(patterns, 6);
        let seven = this.reverseDigitMapping.get(7).split('') as Digit;
        let zero = length6.filter(pattern => {
            return seven.every(segment => pattern.includes(segment));
        })[0];

        this.storePattern(zero, 0);
    }

    private handleTwo(patterns: Digit[]) {
        const length5 = this.getNotYetStoredPattern(patterns, 5);
        const two = length5[0];
        this.storePattern(two, 2);
    }

    private handleThree(patterns: Digit[]) {
        const length5 = this.getNotYetStoredPattern(patterns, 5);
        const one = this.reverseDigitMapping.get(1).split('') as Digit;
        const three = length5.filter(pattern => {
            return one.every(segment => pattern.includes(segment));
        })[0];

        this.storePattern(three, 3);
    }

    private handleFive(patterns: Digit[]) {
        const length5 = this.getNotYetStoredPattern(patterns, 5);
        const nine = this.reverseDigitMapping.get(9);
        const five = length5.filter(pattern => {
            return pattern.every(segment => nine.includes(segment));
        })[0];

        this.storePattern(five, 5);
    }

    private handleSix(patterns: Digit[]) {
        let length6 = this.getNotYetStoredPattern(patterns, 6);
        let six = length6[0];
        this.storePattern(six, 6);
    }

    private handleNine(patterns: Digit[]): void {
        const length6 = this.getNotYetStoredPattern(patterns, 6);
        const four = this.reverseDigitMapping.get(4).split('') as Digit;
        const nine = length6.filter(pattern => {
            return four.every(segment => pattern.includes(segment));
        })[0];

        this.storePattern(nine, 9);
    }

    private getNotYetStoredPattern(patterns: Digit[], length: number) {
        return patterns.filter(digit => {
            const sortedPatternString = digit.sort().join('');
            return digit.length == length && !this.digitMapping.has(sortedPatternString)
        });
    }
}

export function parse(lines: string[]): NoteEntry[] {
    const delimiter = ' | ';

    return lines.map(line => {

        const [signalPatternString, outputValueString] = line.split(delimiter);

        let signalPattern = signalPatternString
            .split(' ')
            .map(digit => digit.split('') as Digit) as SignalPattern;

        let outputValue = outputValueString
            .split(' ')
            .map(digit => digit.split('') as Digit) as OutputValue;

        return {signalPattern, outputValue};
    });
}

export function part1(entries: NoteEntry[]): number {

    const allOutputValues = entries.map(({outputValue}) => outputValue).flat();
    const uniqueNumberOfSegments = [2, 3, 4, 7];

    let digitsUsingUniqueNumberOfSegments = 0;
    for (let value of allOutputValues) {

        if (uniqueNumberOfSegments.includes(value.length))
            digitsUsingUniqueNumberOfSegments++;
    }

    return digitsUsingUniqueNumberOfSegments;
}

export function part2(entries: NoteEntry[]): number {

    let sum = 0;
    for (let entry of entries) {
        const display = new SevenSegmentDisplay(entry.signalPattern);
        sum += display.decode(entry.outputValue);
    }

    return sum;
}

export function main(lines: string[], day: number): void {

    let entries: NoteEntry[];

    console.log(`--- Day ${day}: Seven Segment Search ---`)
    console.log();

    entries = parse(lines);
    let [result, ms] = TimeUtils.measure(part1, entries);
    console.log("  > Unique number of segments:    ", result, " [", ms, "ms]");

    entries = parse(lines);
    let [result2, ms2] = TimeUtils.measure(part2, entries);
    console.log("  > Sum of output values:    ", result2, " [", ms2, "ms]");

    console.log();
}