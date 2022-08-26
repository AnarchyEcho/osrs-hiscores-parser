import { skills, misc } from './data'
process.removeAllListeners('warning')
module.exports = {
  parser: async (usernames: string[]) => {
    const combinedArr = skills.concat(misc);
    const getRawUserData = async (username: string) => {
      const res = await fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${username}`).then(res => res.text())
      return res
    }
    const sortLogic = async (rawData) => {
      const player = [];
      const arr = []
      await rawData.split("\n").filter(emptyItem => emptyItem).forEach((item) => {
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
      return player
    }
    const result = async () => {
      const json = await Promise.all(usernames.map(async (user) => (
        await sortLogic(await getRawUserData(user))
      )))
      return json;
    }
    return result;
  }
}
