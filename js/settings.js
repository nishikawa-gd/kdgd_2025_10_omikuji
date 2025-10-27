// おみくじ結果リスト
const omikujiResults = [
  { type: "大吉",  img: "images/result/daikichi.png" },
  { type: "中吉",  img: "images/result/chukichi.png" },
  { type: "小吉",  img: "images/result/shokichi.png" },
  { type: "吉", img: "images/result/kichi.png"},
  { type: "末吉", img: "images/result/suekichi.png"},
  { type: "凶",  img: "images/result/kyo.png" }
];

const data = {
  result: omikujiResults[Math.floor(Math.random() * omikujiResults.length)]
};
// ラッキーカラー
const colorMap = {
  "赤": "#e53935",
  "青": "#1e88e5",
  "緑": "#43a047",
  "黄色": "#fdd835",
  "紫": "#8e24aa",
  "ピンク": "#ec407a"
};


// ラッキーアイテムON/OFF
const settings = {
  showLuckyItem: true
};
