const axios = require("axios");

const getRandomUsers = async () => {
  const response = await axios.get("https://randomuser.me/api/?results=10");
  return response.data.results;
};

module.exports = {
  getRandomUsers,
};