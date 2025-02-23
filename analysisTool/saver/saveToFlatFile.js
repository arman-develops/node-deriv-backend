
import { writeFile } from "fs/promises";

async function writeToFile(filename, contents) {
    try {
        await writeFile(filename, contents, {flag: 'a'})
    } catch (e) {
        console.error(e);
        
    }
}

export {writeToFile}