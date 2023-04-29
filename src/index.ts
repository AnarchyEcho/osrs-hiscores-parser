import { skills, misc } from './data'
/**
* @param usernames - rsn of the user or users
* @returns An array containing the users arrays
*/
export async function parser(usernames: string[]) {
  const combinedArr = skills.concat(misc);
  const getRawUserData = async (username: string) => {
    const res = await fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${username}`, { mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } }).then(res => res)
    return res.text();
  }
  const sortLogic = (rawData: string) => {
    const player = [];
    const arr = []
    rawData.toString().split("\n").filter(emptyItem => emptyItem).forEach((item) => {
      arr.push(item.split(","));
    })
    arr.forEach((item, i) => {
      player.push({
        "name": combinedArr[i],
        "rank": parseInt(item[0]),
        ...(player.length < 24 ? { "level": parseInt(item[1]) } : { "score": parseInt(item[1]) }),
        ...(item[2] !== undefined ? { "experience": parseInt(item[2]) } : {})
      })
    })
    return player
  }
  const res = await Promise.all(usernames.map(async (user) => {
    return sortLogic(await getRawUserData(user).then(x => x))
  }))
  return res;
}
