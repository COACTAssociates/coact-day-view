const axios = require("axios");

/**
 * @type {import("../types").ServerAction}
 */
const getRandomFacts = async (rliCore, args) => {
  const response = await axios.get("https://zenquotes.io/api/random");
  const [{ q, a }] = response.data;
  return {
    text: q,
    source: a,
  };
};

module.exports = {
  getRandomFacts,
};
