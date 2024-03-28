// findSalesFiles.mjs
import fs from "node:fs/promises";
import { join, extname } from "node:path";


/**
 * This function searches a folder for .json files and returns an array of file paths for sales files.
 * @param {string} folderName - The name of the folder to search for sales files.
 * @returns {Promise<string[]>} - An array of file paths for sales files.
 */
export default async function findSalesFiles(folderName) {
  // this array will hold sales files as they are found
  let salesFiles = [];

  const items = await fs.readdir(folderName, { recursive: true });

  for (const item of items) {
    // Make sure the discovered file is a .json file
    if (extname(item) === ".json") {
      // store the file path in the salesFiles array
      salesFiles.push(join(folderName, item));
    }
  }
  return salesFiles;
}
