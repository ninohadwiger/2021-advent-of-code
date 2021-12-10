import {FileUtils} from "./utils/file.utils";
import * as fs from "fs";
import {prompt} from 'inquirer';

const allFiles = fs.readdirSync('.');
const availableDays = allFiles
    .filter(dir => dir.startsWith('day'))
    .map(dir => ({
        name: 'Day ' + dir.slice(-2),
        value: [parseInt(dir.slice(-2), 10)]
    }));

prompt([
    {
        type: 'list',
        name: 'days',
        message: 'Which challenge would you like to be solved?',
        default: availableDays[availableDays.length - 1].value,
        choices: [{name: 'All', value: availableDays.map(day => day.value[0])}, ...availableDays],
    },
]).then(x => {

    const {days} = x;

    for (let day of days) {

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
    }
});

