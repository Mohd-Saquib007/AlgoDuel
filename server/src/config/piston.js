const axios = require("axios");

const pistonBaseUrl = process.env.PISTON_API_URL || "http://localhost:2000/api/v2";

const piston = axios.create({
    baseURL: pistonBaseUrl,
    timeout: 10000,
});

module.exports = piston;