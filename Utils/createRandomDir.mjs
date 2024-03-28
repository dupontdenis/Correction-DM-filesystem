import { promises as fs } from "fs";
import { join } from "path";

/**
 * Creates a directory with the given name.
 * @param {string} name - The name of the directory to create.
 * @returns {Promise<void>} A promise that resolves when the directory is created.
 */
async function createDir(name) {
  try {
    await fs.mkdir(name);
  } catch {
    console.log(`${name} already exists.`);
  }
}

/**
 * Creates a file with a random name in the specified directory.
 * @param {string} dirName - The name of the directory to create the file in.
 * @returns {Promise<void>} A promise that resolves when the file is created.
 */
async function createFile(dirName) {
  fs.writeFile(
    join(dirName, `${new Date().toISOString().split("T")[0]}.json`),
    JSON.stringify({ total: Math.ceil(1000 * Math.random()) }, null, 2)
  );
}

/**
 * Creates a directory and a file with a random name in the specified directory.
 * @param {string} name - The name of the directory to create.
 * @returns {Promise<void>} A promise that resolves when the directory and file are created.
 */
async function createPurchases(name) {
  await createDir(name);
  await createFile(name);
}

/**
 * Main function that creates directories and files based on a predefined database.
 * @returns {Promise<void>} A promise that resolves when all directories and files are created.
 */
async function main() {
  const DB = new Map([
    ["Shopping", new Set(["restaurant", "food", "clothing"])],
    ["Vacations", new Set(["Paris", "NY"])],
    ["Stores", new Set(["2024", "Evry", "Paris", "NY"])],
  ]);
  for (const [catName, catSet] of DB) {
    await createDir(catName);
    catSet.forEach(async (item) => {
      await createPurchases(join(catName, item));
    });
  }
}

main();
