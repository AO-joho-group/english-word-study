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
    current = WORDS[Math.floor(Math.random() * WORDS.length)];
  
    enEl.textContent = current.en;   // ← 修正
    jpEl.textContent = current.jp;
  
    answerInput.value = "";
    resultEl.textContent = "";
  }


  function judge() {
    const input = answerInput.value.trim().toLowerCase();
    const correct = current.en.toLowerCase(); // ← ここも en
  
    resultEl.textContent =
      input === correct ? "正解" : `正解：${current.en}`;
  
    historyEn.textContent = current.en;
    historyJp.textContent = current.jp;
  
    setTimeout(showWord, 900);
  }

  checkBtn.addEventListener("click", judge);
  answerInput.addEventListener("keydown", e => {
    if (e.key === "Enter") judge();
  });

  showWord();
});
