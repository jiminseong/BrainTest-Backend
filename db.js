const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  host: process.env.REDIS_HOST, // Redis 호스트 (예: localhost 또는 Redis 서버 주소)
  port: process.env.REDIS_PORT, // Redis 포트 (기본값: 6379)
  password: process.env.REDIS_PASSWORD, // 필요 시 비밀번호
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = client;
