// おみくじ結果リスト
const omikujiResults = [
  { type: "シリウス", 
    text: "太陽を除いて地球から見える恒星の中で、最も明るい星。今のあなたは、誰よりも輝いて見える。今はひとりぼっちでも、その光に惹かれて、きっと誰かがあなたを見つけにくる。", 
    img: "images/result/sirius/1x/sirius.png"
  },
  { type: "アルタイル", 
    text: "川の向こうで、誰かを想い続ける星。あなたが感じる寂しさは、やさしさの証。その想いが消えない限り、きっと再び誰かと光を交わせる日が来る。", 
    img: "images/result/altair/1x/altair.png"
  },
  { type: "ベガ", 
    text: "夏の夜空にひとり光る星。あなたの心にも、叶えたい願いがひとつあるでしょう。それはまだ遠くに見えても、あなたが信じる限り、夜空は必ず応える。", 
    img: "images/result/bega/1x/bega.png"
  },
  { type: "プロキオン", 
    text: "小さくても確かな光。あなたの優しさは、誰かにとっての夜明け。自分では気づかなくても、その光はすでに誰かの道を照らしている。", 
    img: "images/result/procyon/1x/procyon.png"
  }
];

// ラッキーアイテム
const luckyItems = ["透明なガラスの小物", "水色のスカーフ", "青いペン", "小さな鈴", "白い花", "冷たい紅茶"];

// ラッキーアイテムON/OFF
const settings = {
  showLuckyItem: true
};
