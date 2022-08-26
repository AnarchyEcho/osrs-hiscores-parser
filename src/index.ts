import { skills, misc } from './data'
process.removeAllListeners('warning')
module.exports = {
  parser: async (usernames: string[]) => {
    async function fetcher(user) {
      const arr = [];
      const player = [];
      const combinedArr = skills.concat(misc);
      const init = await fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${user}`).then((res) => res.text())
      init.split("\n").filter(emptyItem => emptyItem).forEach((item) => {
        arr.push(item.split(","));
      })
      arr.forEach((item, i) => {
        player.push({
          "name": combinedArr[i],
          "rank": parseInt(item[0]),
          ...(player.length < 24 ? {"level": parseInt(item[1])} : {"score": parseInt(item[1])}),
          ...(item[2] !== undefined ? {"experience": parseInt(item[2])} : {})
        })
      })
      return player;
    }
    return usernames.map(async (user) => {
      await fetcher(user)
    })
  }
}
