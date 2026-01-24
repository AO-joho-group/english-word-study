window.addEventListener("DOMContentLoaded", () => {
  const jpEl = document.getElementById("question-jp");
  const enEl = document.getElementById("question-en");
  const answerInput = document.getElementById("answer");
  const checkBtn = document.getElementById("check");
  const resultEl = document.getElementById("result");
  const historyEn = document.getElementById("history-eng");
  const historyJp = document.getElementById("history-jp");

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

    // ★ ここが本質
    enEl.textContent = current.eng;
    jpEl.textContent = current.jp;

    answerInput.value = "";
    resultEl.textContent = "";
  }

  function judge() {
    const input = answerInput.value.trim().toLowerCase();
    const correct = current.eng.toLowerCase();

    resultEl.textContent =
      input === correct ? "正解" : `正解：${current.eng}`;

    historyEn.textContent = current.eng;
    historyJp.textContent = current.jp;

    setTimeout(showWord, 900);
  }

  checkBtn.addEventListener("click", judge);
  answerInput.addEventListener("keydown", e => {
    if (e.key === "Enter") judge();
  });

  showWord();
});
