const { Client } = require("@neondatabase/serverless");
global.WebSocket = require("ws");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect().catch((err) => {
  console.error("Failed to connect to the database:", err);
});

module.exports = client;

