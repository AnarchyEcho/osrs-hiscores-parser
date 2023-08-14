import { skills, misc } from './data'

/**
* @param usernames - rsn of the user or users
* @returns An array containing an object for each user
*/
export async function parser(usernames: string[]) {
  const combinedArr = skills.concat(misc);
  const getRawUserData = async (username: string) => {
    const response = await fetch(`https://cors-anywhere-apqk.onrender.com/https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${username}`)
    const rawUserData = await response.text()
    return rawUserData;
  }

  const formatUserData = (rawData: string) => {
    const player: any[] = [];
    const arr: any[] = []
    rawData.toString().split("\n").filter(emptyItem => emptyItem).forEach((item) => {
      arr.push(item.split(","));
    })

    arr.forEach((item: string, i: number) => {
      player.push({
        "name": combinedArr[i],
        "rank": parseInt(item[0]),
        ...(player.length < 24 ? { "level": parseInt(item[1]) } : { "score": parseInt(item[1]) }),
        ...(item[2] !== undefined ? { "experience": parseInt(item[2]) } : {})
      })
    })
    return player
  }
  return await Promise.all(usernames.map(async (username: string) => {
    return { name: username, data: formatUserData(await getRawUserData(username)) };
  }))
}