import * as fs from "fs";

export class FileUtils {

    /***
     * Reads the content of a file
     * @param path absolute path to a file
     * @returns a array of lines (= content of the file)
     */
    static getLinesOfFile(path: string): string[] {
        return fs.readFileSync(path, 'utf-8')
            .split('\n');
    }
}

