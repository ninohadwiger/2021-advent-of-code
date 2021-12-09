import {FileUtils} from "./utils/file.utils";
import * as fs from "fs";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`Solve challenge of day `, input => {
    console.log();

    const day = parseInt(input, 10);
    const dayString = day.toString().padStart(2, '0');

    // check if input is valid
    if (Number.isNaN(day) || day < 1 || day > 25) {
        console.error(`You provided an invalid day (${day}).`)
        console.error(`The input must be between 1 and 25`);
        process.exit(1);
    }


    const srcFolder = `./day-${dayString}/src`;
    const srcFile = `${srcFolder}/day-${dayString}`;

    // check if day is already implemented
    if (!fs.existsSync(srcFolder)) {
        console.error(`Day ${day} is not implemented yet.`);
        process.exit(1);
    }

    const callback = require(srcFile)['main'];

    const assetFolder = `./day-${dayString}/assets`;
    const inputFile = `${assetFolder}/data.in`;
    const lines = FileUtils.getLinesOfFile(inputFile);

    callback(lines, day);

    readline.close();
});

