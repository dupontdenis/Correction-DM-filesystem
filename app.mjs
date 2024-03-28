/**
 * This module is responsible for calculating and storing sales totals.
 * It reads sales files from a specified directory, calculates the total sales,
 * and writes the total to a file.
 */
import fs from "node:fs/promises";
import { join, extname } from "node:path";
import calculateSalesTotal from "./Utils/calculTotal.mjs";
import findSalesFiles from "./Utils/findSalesFiles.mjs";
import { access } from 'fs/promises';



// Get the sales directory from the command line arguments
//node app.mjs stores
//node app.mjs  

const salesDir = process.argv[2] || "stores";
const salesTotalsDir = "salesTotals";

// Check if the salesDir directory exists
try {
    await access(salesDir);
} catch (error) {
    console.log(`The directory '${salesDir}' does not exist. Please create it before running the app. You can run 'node createRandomDir.mjs' to create the directory and some sales files.`);
    process.exit(0);
}

// create the salesTotal directory if it doesn't exist
try {
  await fs.mkdir(salesTotalsDir);
} catch {
  console.log(`${salesTotalsDir} already exists.`);
}

// find paths to all the sales files
const salesFiles = await findSalesFiles(salesDir);

// read through each sales file to calculate the sales total
const salesTotal = await calculateSalesTotal(salesFiles);

// write the total to the "totals.json" file
await fs.writeFile(
  join(salesTotalsDir, "totals.txt"),
  `Total at ${new Date().toLocaleDateString()} from ${salesDir}: ${salesTotal}€\r\n`,
  {
    flag: "a",
  }
);

console.log(`Wrote sales totals ${salesTotal}€ to ${salesTotalsDir}`);

export default salesTotal;
