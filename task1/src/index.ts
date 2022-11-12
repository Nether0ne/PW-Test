import * as fs from "fs";
import * as readline from "readline";
import * as zlib from "zlib";
import { SearchVolumeClient } from "./SearchVolumeClient";

const startDate: Date = new Date();
const fileRoute: string = "./input/keywords.txt.gz";
const rl = readline.createInterface({
  input: fs.createReadStream(fileRoute).pipe(zlib.createGunzip()),
});

const searchVolumeClient = new SearchVolumeClient();
let lines: number = 0;
let chunk: string[] = [];
let searchVolumes = new Map<string, number>();

const start = async () => {
  for await (const line of rl) {
    lines++;
    chunk.push(line);

    if (chunk.length === 100) {
      searchVolumes = mergeKeywordVolumes([
        searchVolumes,
        await searchVolumeClient.getSearchVolume(chunk),
      ]);
      chunk = [];
    }
  }

  if (chunk.length !== 0) {
    searchVolumes = mergeKeywordVolumes([
      searchVolumes,
      await searchVolumeClient.getSearchVolume(chunk),
    ]);
  }

  console.log("Keywords volumes:");

  for (const [key, val] of searchVolumes) {
    console.log(`${key} = ${val}`);
  }

  console.log(
    `\nProcessed ${lines} lines in ${
      new Date().getTime() - startDate.getTime()
    } ms`,
  );
};

start();

const mergeKeywordVolumes = (keywords: Map<string, number>[]) => {
  return keywords.reduce(
    (sums: Map<string, number>, series: Map<string, number>) =>
      Array.from(series).reduce(
        (sums, [key, val]) => sums.set(key, (sums.get(key) || 0) + val),
        sums,
      ),
    new Map<string, number>(),
  );
};
