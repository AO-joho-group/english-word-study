console.log("input.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  console.log("dom ready");

  const questionJp = document.getElementById("question-jp");
  const answerInput = document.getElementById("answer");
  const checkBtn = document.getElementById("check");
  const result = document.getElementById("result");
  const historyEn = document.getElementById("history-eng");
  const historyJp = document.getElementById("history-jp");

  if (!questionJp || !answerInput || !checkBtn) {
    console.error("必要な要素が見つからない");
    return;
  }

  let current = null;

  function nextQuestion() {
    current = WORDS[Math.floor(Math.random() * WORDS.length)];
    questionJp.textContent = current.jp;
    answerInput.value = "";
    result.textContent = "";
  }

  checkBtn.addEventListener("click", () => {
    const input = answerInput.value.trim();

    if (!current) return;

    if (input.toLowerCase() === current.en.toLowerCase()) {
      result.textContent = "正解";
      historyEn.textContent = current.en;
      historyJp.textContent = current.jp;
      setTimeout(nextQuestion, 800);
    } else {
      result.textContent = "違う";
    }
  });

  answerInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      checkBtn.click();
    }
  });

  nextQuestion();
});
