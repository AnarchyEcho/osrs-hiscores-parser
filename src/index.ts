module.exports = {
  parser: async (url: string) => {
    if (typeof url !== "string") {
      throw new TypeError("Parser requires a URL as a string.");
    }
    return await fetch(url).then((res) => res.json());
  }
}
