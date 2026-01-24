console.log("input.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  const jpEl = document.getElementById("question-jp");
  const enEl = document.getElementById("question-en");
  const answerInput = document.getElementById("answer");
  const checkBtn = document.getElementById("check");
  const resultEl = document.getElementById("result");
  const historyEn = document.getElementById("history-eng");
  const historyJp = document.getElementById("history-jp");

  if (!jpEl || !enEl || !answerInput || !checkBtn) {
    console.error("必要な要素が見つからない");
    return;
  }

  if (!window.WORDS || WORDS.length === 0) {
    alert("words.js が読み込まれていません");
    return;
  }

  let current = null;

  function pickWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  function showWord() {
    current = pickWord();
    jpEl.textContent = current.jp;
    enEl.textContent = current.en; // ← 常に表示
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
