console.log("input.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const jpEl = document.getElementById("question-jp");
  const enEl = document.getElementById("question-en");
  const answerInput = document.getElementById("answer");
  const checkBtn = document.getElementById("check");
  const resultEl = document.getElementById("result");
  const historyEn = document.getElementById("history-eng");
  const historyJp = document.getElementById("history-jp");

  if (!window.WORDS || WORDS.length === 0) {
    jpEl.textContent = "WORDS が空";
    enEl.textContent = "words.js 読み込み失敗";
    return;
  }

  let current = null;

  function pickWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  function fitText(el, maxSize, minSize) {
    let size = maxSize;
    el.style.fontSize = size + "px";

    while (el.scrollWidth > el.clientWidth && size > minSize) {
      size -= 1;
      el.style.fontSize = size + "px";
    }
  }

  function showWord() {
    current = pickWord();

    jpEl.textContent = current.jp;
    enEl.textContent = current.en;

    // フォント自動調整（1行固定）
    fitText(enEl, 48, 18);
    fitText(jpEl, 28, 14);

    answerInput.value = "";
    resultEl.textContent = "";
    answerInput.focus();
  }

  function judge() {
    if (!current) return;

    const input = answerInput.value.trim().toLowerCase();
    const correct = current.en.toLowerCase();

    if (input === correct) {
      resultEl.textContent = "正解";
    } else {
      resultEl.textContent = `正解：${current.en}`;
    }

    historyEn.textContent = current.en;
    historyJp.textContent = current.jp;

    setTimeout(showWord, 900);
  }

  checkBtn.addEventListener("click", judge);

  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      judge();
    }
  });

  showWord();
});
