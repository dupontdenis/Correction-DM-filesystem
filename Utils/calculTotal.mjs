import fs from "node:fs/promises";

export default async function calculateSalesTotal(salesFiles) {
  // map each file path in the salesFiles array to a promise that reads the file and parses the contents as JSON
  const salesDataPromises = salesFiles.map(async (file) => {
    const data = JSON.parse(await fs.readFile(file));
    return data.total;
  });

  // wait for all promises to resolve
  const salesData = await Promise.all(salesDataPromises);

  //console.log(`sales Data ${JSON.stringify(salesData)}`);

  // calculate the total sales
  const salesTotal = salesData.reduce((total, current) => total + current, 0);

  return salesTotal;
}
