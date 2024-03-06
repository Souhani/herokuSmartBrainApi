const redis = require("redis");

// Create a new Redis client
const client = redis.createClient({
    url: process.env.REDIS_URI,
});

// Handle connection events
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Error:', err);
});

// Export the client to be used in other modules
module.exports = client;

