const axios = require("axios");

const piston = axios.create({
    baseURL: "http://localhost:2000/api/v2",
    timeout: 10000,
});

module.exports = piston;