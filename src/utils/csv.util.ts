import csv from "csv-parser";
import * as fs from "fs";

export async function csvExtractor(path: string, config?: csv.Options) {
  return (await new Promise((resolve, reject) => {
    const result = [];
    const targetFile = fs.createReadStream(path);

    targetFile
      .pipe(csv(config))
      .on("data", (data) => {
        result.push(data);
      })
      .on("end", () => {
        resolve(result);
      })
      .on("error", (error) => {
        reject(error);
      });
  })) as any[];
}
