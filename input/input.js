console.log("input.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  if (!window.WORDS || WORDS.length === 0) {
    alert("words.js が読み込まれていません");
    return;
  }

  const enEl = document.getElementById("question-en");
  const jpEl = document.getElementById("question-jp");
  const answerEl = document.getElementById("answer");
  const checkBtn = document.getElementById("check");
  const resultEl = document.getElementById("result");
  const historyEn = document.getElementById("history-eng");
  const historyJp = document.getElementById("history-jp");

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

    enEl.textContent = current.en;
    jpEl.textContent = current.jp;

    fitText(enEl, 48, 20);
    fitText(jpEl, 32, 16);

    answerEl.value = "";
    resultEl.textContent = "";
    answerEl.focus();
  }

  function judge() {
    if (!current) return;

    const input = answerEl.value.trim().toLowerCase();
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

  answerEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      judge();
    }
  });

  showWord();
});
