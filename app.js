const express = require("express");
const client = require("./db"); // Redis 클라이언트 가져오기

const app = express();
const port = 8000;

client.on("error", (err) => {
  console.error("Redis error:", err);
});

// 현재 count 값을 가져오는 함수
function getCount(callback) {
  client.get("count", (err, count) => {
    if (err) {
      console.error("Redis GET error:", err);
      return callback(0); // 오류 발생 시 기본값 0으로 처리
    }
    callback(parseInt(count) || 0); // count가 없으면 0으로 처리
  });
}

// count 값을 저장하는 함수
function saveCount(count) {
  client.set("count", count, (err) => {
    if (err) {
      console.error("Redis SET error:", err);
    }
  });
}

// 현재 count 값을 반환하는 API
app.get("/api/count", (req, res) => {
  getCount((count) => {
    res.json({ count });
  });
});

// count 값을 증가시키는 API
app.post("/api/count", (req, res) => {
  getCount((count) => {
    if (count >= 21) {
      res.json({
        count,
        message: "더 이상 당첨되지 않습니다.",
      });
    } else {
      count += 1;
      saveCount(count);
      res.json({
        count,
        message: "축하합니다! 당첨되었습니다.",
      });
    }
  });
});

module.exports = app;
