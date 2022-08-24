module.exports = {
    parser: async (url) => {
        if (typeof url !== "string") {
            throw new TypeError("osrs-hiscores-parser requires a string.");
        }
        return await fetch(url).then((res) => res.json());
    }
};
