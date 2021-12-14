import {TimeUtils} from "../../utils/time.utils";
import {ArrayUtils} from "../../utils/array.utils";

enum BracketState {
    Valid, Corrupted, Incomplete
}

export class BracketValidator {

    private readonly bracketState: BracketState;

    private firstIllegalBracketIndex = -1;
    private missingBrackets = [];
    private reversBracketMap = new Map<string, string>([
        [')', '('],
        [']', '['],
        ['}', '{'],
        ['>', '<'],
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        ['<', '>']
    ]);
    private corruptedBracketPointMap = new Map<string, number>([
        ['', 0],
        [')', 3],
        [']', 57],
        ['}', 1197],
        ['>', 25137]
    ]);
    private missingBracketPointMap = new Map<string, number>([
        ['', 0],
        [')', 1],
        [']', 2],
        ['}', 3],
        ['>', 4]
    ]);

    constructor(private brackets: string) {
        this.bracketState = this.validateBracketLine(brackets);
    }

    get illegalBracket(): string {
        return this.bracketState === BracketState.Corrupted ?
            this.brackets[this.firstIllegalBracketIndex] : '';
    }

    private static isLeftBracket(bracket: string): boolean {
        return ['(', '[', '{', '<'].includes(bracket);
    }

    // PART I
    public calculateCorruptedBracketScore(): number {
        return this.corruptedBracketPointMap.get(this.illegalBracket);
    }

    // PART II
    public calculateAutocompleteBracketScore(): number {
        const penalty = 5;
        let score = 0;

        for (let bracket of this.missingBrackets) {
            score = score * penalty + this.missingBracketPointMap.get(bracket);
        }

        return score;
    }

    private getReversedBracket(bracket: string): string {
        return this.reversBracketMap.get(bracket);
    }

    private validateBracketLine(brackets: string): BracketState {

        const bracketStack = [];
        for (let i = 0; i < brackets.length; ++i) {
            const bracket = brackets[i];
            const reverse = this.getReversedBracket(bracket);

            if (BracketValidator.isLeftBracket(bracket)) {
                bracketStack.push(bracket);
            } else if (bracketStack.length === 0 || bracketStack.pop() != reverse) {
                this.firstIllegalBracketIndex = i;
                return BracketState.Corrupted;
            }
        }

        // store missing brackets
        this.missingBrackets = bracketStack.reverse()
            .map(bracket => this.getReversedBracket(bracket));

        return bracketStack.length === 0 ?
            BracketState.Valid :
            BracketState.Incomplete;
    }

}

// ====================================================================================
// === DAY 10 ==========================================================================

export function parse(lines: string[]): string[] {
    return lines
}

export function part1(lines: string[]): number {

    let bracketValidators = lines.map(line => new BracketValidator(line));

    return bracketValidators
        .map(validator => validator.calculateCorruptedBracketScore())
        .reduce(ArrayUtils.sum);
}

export function part2(lines: string[]): number {

    let bracketValidators = lines.map(line => new BracketValidator(line));

    const errorScores = bracketValidators
        .map(validator => validator.calculateAutocompleteBracketScore())
        .filter(score => score > 0)
        .sort((a, b) => a - b);

    // reduce length by one since there are always an odd number of scores
    const midIndex = (errorScores.length - 1) / 2;

    return errorScores[midIndex];
}

export function main(lines: string[], day: number): void {

    console.log(`--- Day ${day}: Syntax Scoring ---`)
    console.log();

    let [result, ms] = TimeUtils.measure(part1, lines);
    console.log("  > Total syntax error score:  ", result, " [", ms, "ms]");

    let [result2, ms2] = TimeUtils.measure(part2, lines);
    console.log("  > Total autocomplete score: ", result2, " [", ms2, "ms]");

    console.log();
}