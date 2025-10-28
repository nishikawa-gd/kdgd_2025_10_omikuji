// // const startBtn = document.getElementById("start-btn");
// // const restartBtn = document.getElementById("restart-btn");
// // const introPage = document.getElementById("intro-page");
// // const loadingPage = document.getElementById("loading-page");
// // const resultPage = document.getElementById("result-page");
// // const loadingDaruma = document.getElementById("loading-daruma");
// // const resultImg = document.getElementById("result-img");
// // const resultText = document.getElementById("result-text");

// // // おみくじ内容
// // const fortunes = [
// //   { img: "dai.png", name: "大吉", message: "最高の一日がやってきます！✨ チャンスを逃さず、思いきり楽しんで！🍀" },
// //   { img: "chu.png", name: "中吉", message: "がんばりだるま💪🌷 今日の努力がきっと実を結びます！" },
// //   { img: "go.png", name: "吉", message: "ほっこりだるま🍵🍀 小さな幸せを感じられる日になりそうです。" },
// //   { img: "sho.png", name: "小吉", message: "今日は小さな幸せがあなたを待っています。焦らず、笑顔で過ごしましょう！🌸" },
// //   { img: "ku.png", name: "凶", message: "チャレンジ運ころんだるま💧❤️ うまくいかない時も焦らず、前向きにいこう！" }
// // ];

// // // スタートボタン
// // startBtn.addEventListener("click", () => {
// //   introPage.classList.remove("active");
// //   loadingPage.classList.add("active");
// //   loadingDaruma.classList.add("swing"); // ← ローディング中にアニメーション開始

// //   // 3秒後に結果ページへ
// //   setTimeout(() => {
// //     loadingPage.classList.remove("active");
// //     loadingDaruma.classList.remove("swing");
// //     const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
// //     resultImg.src = fortune.img;
// //     resultText.textContent = fortune.message;
// //     resultPage.classList.add("active");
// //   }, 3000);
// // });

// // // リスタートボタン
// // restartBtn.addEventListener("click", (e) => {
// //   e.preventDefault();
// //   resultPage.classList.remove("active");
// //   introPage.classList.add("active");
// // });

// const startBtn = document.getElementById("start-btn");
// const restartBtn = document.getElementById("restart-btn");
// const historyBtn = document.getElementById("history-btn");
// const backBtn = document.getElementById("back-btn");
// const clearHistoryBtn = document.getElementById("clear-history-btn");

// const introPage = document.getElementById("intro-page");
// const loadingPage = document.getElementById("loading-page");
// const resultPage = document.getElementById("result-page");
// const historyPage = document.getElementById("history-page");
// const loadingDaruma = document.getElementById("loading-daruma");
// const resultImg = document.getElementById("result-img");
// const resultText = document.getElementById("result-text");
// const historyList = document.getElementById("history-list");

// const fortunes = [
//   { img: "dai.png", name: "大吉", message: "最高の一日がやってきます！✨ チャンスを逃さず楽しもう！" },
//   { img: "chu.png", name: "中吉", message: "がんばりだるま💪🌷 今日の努力がきっと実を結びます！" },
//   { img: "go.png", name: "吉", message: "ほっこりだるま🍵🍀 小さな幸せを感じられる日です。" },
//   { img: "sho.png", name: "小吉", message: "焦らず、笑顔で過ごすといい日になりそうです🌸" },
//   { img: "ku.png", name: "凶", message: "チャレンジ運ころんだるま💧❤️ 前向きにいこう！" }
// ];

// // 履歴データを取得
// let history = JSON.parse(localStorage.getItem("omikujiHistory")) || [];

// // スタート
// startBtn.addEventListener("click", () => {
//   introPage.classList.remove("active");
//   loadingPage.classList.add("active");
//   loadingDaruma.classList.add("swing");

//   setTimeout(() => {
//     loadingPage.classList.remove("active");
//     loadingDaruma.classList.remove("swing");

//     const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
//     resultImg.src = fortune.img;
//     resultText.textContent = `${fortune.name}：${fortune.message}`;
//     resultPage.classList.add("active");

//     // 履歴に追加
//     const now = new Date();
//     const dateStr = now.toLocaleString("ja-JP", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
//     history.unshift({ ...fortune, date: dateStr });
//     if (history.length > 10) history.pop(); // 最大10件に制限
//     localStorage.setItem("omikujiHistory", JSON.stringify(history));
//   }, 3000);
// });

// // もう一度
// restartBtn.addEventListener("click", () => {
//   resultPage.classList.remove("active");
//   introPage.classList.add("active");
// });

// // 履歴を見る
// historyBtn.addEventListener("click", () => {
//   resultPage.classList.remove("active");
//   historyPage.classList.add("active");
//   renderHistory();
// });

// // 履歴を戻る
// backBtn.addEventListener("click", () => {
//   historyPage.classList.remove("active");
//   resultPage.classList.add("active");
// });

// // 履歴削除
// clearHistoryBtn.addEventListener("click", () => {
//   localStorage.removeItem("omikujiHistory");
//   history = [];
//   renderHistory();
// });

// // 履歴リスト描画
// function renderHistory() {
//   historyList.innerHTML = "";
//   if (history.length === 0) {
//     historyList.innerHTML = "<p>履歴はまだありません。</p>";
//     return;
//   }
//   history.forEach((item) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <img src="${item.img}" alt="${item.name}" />
//       <div>
//         <strong>${item.name}</strong> <span>(${item.date})</span><br>
//         <small>${item.message}</small>
//       </div>
//     `;
//     historyList.appendChild(li);
//   });
// }
// --- 結果パターン ---
const fortunes = [
  {
    name: "大吉",
    image: "img/dai.png",
    message: "るんるんだるま⭐今日は最高の運勢！笑顔で1日を過ごそう！"
  },
  {
    name: "中吉",
    image: "img/chu.png",
    message: "がんばりだるま💪🌷 ちょっぴり幸せな1日！"
  },
  {
    name: "小吉",
    image: "img/sho.png",
    message: "もうすぐだるま👀🌸 穏やかで優しい1日になりそう。"
  },
  {
    name: "吉",
    image: "img/go.png",
    message: "ほっこりだるま🍵🌿無難で平和な一日。感謝の気持ちを忘れずに過ごしましょう。"
  },
  {
    name: "凶",
    image: "img/ku.png",
    message: "チャレンジ運ころんだるま💦❤️ 今日は慎重に行動してね。"
  }
];

const introPage = document.getElementById("intro-page");
const loadingPage = document.getElementById("loading-page");
const resultPage = document.getElementById("result-page");
const resultDiv = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// ---- Start Button ----
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  introPage.classList.add("hidden");
  loadingPage.classList.remove("hidden");

  // 2秒後に結果ページを表示
  setTimeout(() => {
    loadingPage.classList.add("hidden");
    showResult();
  }, 2000);
});

// ---- Show Result ----
function showResult() {
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  resultDiv.innerHTML = `
    <img src="${fortune.image}" alt="${fortune.name}" class="result-image">
    <p>${fortune.message}</p>
  `;
  resultPage.classList.remove("hidden");
}

// ---- Restart Button ----
restartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resultPage.classList.add("hidden");
  introPage.classList.remove("hidden");
});
