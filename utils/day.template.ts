


export function parse(lines: string[]): any /* TODO */ {
    throw new Error("Method not implemented yet.");
}

export function part1(/* TODO */): any /* TODO */ {
    throw new Error("Method not implemented yet.");
}

export function part2(/* TODO */): any /* TODO */  {
    throw new Error("Method not implemented yet.");
}

export function test_day_(lines: string[], day: number): void {
    
    console.log(`--- Day ${day}: _______ ---`)

    console.log();

    let parsed = parse(lines);
    let result = part1();
    console.log("  > Part I:  ", result);

    let parsed2 = parse(lines);
    let result2 = part2();
    console.log("  > Part II: ", result2);

    console.log();
}