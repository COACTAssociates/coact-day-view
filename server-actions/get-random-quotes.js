const axios = require("axios");

const getRandomQuotes = async () => {
  const response = await axios.get("https://dummyjson.com/quotes/random");
  return response.data;
};

module.exports = {
  getRandomQuotes,
};