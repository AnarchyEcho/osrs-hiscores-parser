import { skills, misc } from './data'
module.exports = {
  parser: async (username: string[]) => {
    const users = [username];
    const combinedArr = skills.concat(misc);
    let usersArr = [];

    if (typeof username !== "string" || Array) {
      throw new TypeError("Parser requires one or more usernames as a string or array of strings.");
    }

    users.forEach((user) => {
      const arr = [];
      const player = [];
      fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${user}`)
      .then((res) => res.text().then((row) => {
        row.split("\n").filter(emptyItem => emptyItem).forEach((item) => {
          arr.push(item.split(","));
        })
      }))
      .then(() => {
        arr.forEach((item, i) => {
          player.push({
            "name": combinedArr[i],
            "rank": parseInt(item[0]),
            ...(player.length < 24 ? {"level": parseInt(item[1])} : {"score": parseInt(item[1])}),
            ...(item[2] !== undefined ? {"experience": parseInt(item[2])} : {})
          })
        })
        usersArr.push(player)
      })
    })
    return usersArr;
  }
}
