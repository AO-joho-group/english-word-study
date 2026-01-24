console.log("input.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const jpEl = document.getElementById("question-jp");
  const enEl = document.getElementById("question-en");

  // テスト用ダミー
  const testWord = {
    en: "ENGLISH",
    jp: "日本語"
  };

  jpEl.textContent = testWord.jp;
  enEl.textContent = testWord.en;

  console.log("word rendered");
});

/*// 読み込み確認
alert("input.js loaded");

// 要素取得
const enEl = document.getElementById("question-en");
const jpEl = document.getElementById("question-jp");
const answerEl = document.getElementById("answer");
const checkBtn = document.getElementById("check");
const resultEl = document.getElementById("result");
const histEn = document.getElementById("history-eng");
const histJp = document.getElementById("history-jp");

// 必須チェック
if (!enEl || !jpEl || !answerEl || !checkBtn) {
  alert("HTML要素が取得できていない");
}

if (!window.WORDS || window.WORDS.length === 0) {
  alert("WORDS が存在しない");
}

// 状態
let current = null;

// 単語表示
function showWord() {
  current = WORDS[Math.floor(Math.random() * WORDS.length)];

  enEl.textContent = current.en;
  jpEl.textContent = current.jp;

  answerEl.value = "";
  resultEl.textContent = "";

  answerEl.focus();
}

// 判定
function judge() {
  if (!current) return;

  const input = answerEl.value.trim().toLowerCase();
  const correct = current.en.toLowerCase();

  if (input === correct) {
    resultEl.textContent = "正解";
  } else {
    resultEl.textContent = "正解：" + current.en;
  }

  histEn.textContent = current.en;
  histJp.textContent = current.jp;

  setTimeout(showWord, 1000);
}

// イベント登録
checkBtn.addEventListener("click", judge);

answerEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    judge();
  }
});

// 初期表示
showWord();
