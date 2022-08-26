import { skills, misc } from './data'
process.removeAllListeners('warning')
module.exports = {
  parser: async (usernames: string[]) => {
    const combinedArr = skills.concat(misc);
    usernames.forEach((username) => {
      const arr = [];
      const player = [];
      fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${username}`)
      .then((res) => res.text().then((row) => {
        row.split("\n").filter(emptyItem => emptyItem).forEach((item) => {
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
      }))
      return player;
    })
  }
}

const parser = async (usernames: string[]) => {
  const combinedArr = skills.concat(misc);
  let json = usernames.map((username) => {
    const arr = [];
    let player = [];
    fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${username}`)
    .then((res) => res.text().then((row) => {
      row.split("\n").filter(emptyItem => emptyItem).map((item) => {
        arr.push(item.split(","));
      })
      arr.map((item, i) => {
        player.push({
          "name": combinedArr[i],
          "rank": parseInt(item[0]),
          ...(player.length < 24 ? {"level": parseInt(item[1])} : {"score": parseInt(item[1])}),
          ...(item[2] !== undefined ? {"experience": parseInt(item[2])} : {})
        })
      })
    }))
    return player;
  })
  console.log(json)
  return json;
}
parser(["echogim", "emerald12"])