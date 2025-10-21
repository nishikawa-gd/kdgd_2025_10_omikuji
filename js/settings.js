// おみくじ結果リスト
const omikujiResults = [
  { type: "大当たり！", text: "カゴいっぱいのおかしをどうぞ！", img: "images/result/lucky.png" },
  { type: "当たり！", text: "お菓子をいくつかゲット！まあまあの幸運", img: "images/result/good.png" },
  { type: "まぁまぁ", text: "お菓子をひとつゲットした！", img: "images/result/well.png" },
  { type: "大ハズレ", text: "イタズラされた！", img: "images/result/bad.png" }
];

// キャラクター画像
const omikujiCharacter = [
  { img: "images/result/franken2.png" },
  { img: "images/result/pumpkin2.png" },
  { img: "images/result/ghost3.png" },
  { img: "images/result/ghost4.png" },
  { img: "images/result/dracula2.png" }
];

// ラッキーアイテム
const luckyItems = ["ランタン", "小説", "キャンディ", "鍵", "猫のキーホルダー", "お茶"];

// 表示設定
const settings = {
  showLuckyItem: true
};
