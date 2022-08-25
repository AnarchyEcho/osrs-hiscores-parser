import fs from 'fs';
import { parse } from 'csv-parse';
import { skills, misc } from './data'
module.exports = {
  parser: async (username: string[]) => {
    if (typeof username !== "string") {
      throw new TypeError("Parser requires one or more usernames as a string or array of strings.");
    }
    fs.readFile("../sample.txt", (err, data) => {console.log(data)});
  }
}
const arr = [];
let player = [];
const combinedArr = skills.concat(misc);
fs.createReadStream("./sample.txt").pipe(parse({ delimiter: "\n" })
  .on("data", (row) => {
    arr.push(row.toString().split(","));
  })
  .on("error", (err) => {
    console.log(err.message);
  })
  .on("end", () => {
    arr.forEach((item, i) => {
      player.push({
        "name": combinedArr[i],
        "rank": parseInt(item[0]),
        ...(player.length < 24 ? {"level": parseInt(item[1])} : {"score": parseInt(item[1])}),
        ...(item[2] !== undefined ? {"experience": parseInt(item[2])} : {})
      })
    })
    console.log(player);
  })
)
