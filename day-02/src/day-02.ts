enum Command {
    FORWARD = "forward",
    UP = "up",
    DOWN = "down"
}

function calculatePositionAndDepth(commands: string[]): number {

    let position = 0;
    let depth = 0;

    for (let commandLine of commands) {
        const [command, value] = commandLine.split(" ");

        switch (command) {
            case Command.FORWARD:
                position += +value;
                break;
            case Command.DOWN:
                depth += +value;
                break;
            case Command.UP:
                depth -= +value;
                break;
        }
    }

    return position * depth;
}

function calculatePositionAimAndDepth(commands: string[]): number {

    let position = 0;
    let aim = 0;
    let depth = 0;

    for (let commandLine of commands) {
        const [command, value] = commandLine.split(" ");

        switch (command) {
            case Command.FORWARD:
                position += +value;
                depth += aim * +value;
                break;
            case Command.DOWN:
                aim += +value;
                break;
            case Command.UP:
                aim -= +value;
                break;
        }
    }

    return position * depth;
}

export function parse(lines: string[]): string[] {
    return lines;
}

export function part1(commands: string[]): number {
    return calculatePositionAndDepth(commands);
}

export function part2(commands: string[]): number {
    return calculatePositionAimAndDepth(commands);
}

export function main(lines: string[]): void {

    console.log('--- Day 2: Dive! ---')
    console.log();

    const result = calculatePositionAndDepth(lines);
    console.log('  > Part I: ', result);

    const result2 = calculatePositionAimAndDepth(lines);
    console.log('  > Part II: ', result2);

    console.log();
}