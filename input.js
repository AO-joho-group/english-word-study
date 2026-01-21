// ===== input.js =====

// 画面ログ用（スマホ確認用）
function log(msg) {
  let box = document.getElementById("debug");
  if (!box) {
    box = document.createElement("div");
    box.id = "debug";
    box.style.position = "fixed";
    box.style.bottom = "0";
    box.style.left = "0";
    box.style.width = "100%";
    box.style.maxHeight = "30vh";
    box.style.overflowY = "auto";
    box.style.background = "rgba(0,0,0,0.8)";
    box.style.color = "#0f0";
    box.style.fontSize = "12px";
    box.style.padding = "4px";
    document.body.appendChild(box);
  }
  box.textContent += msg + "\n";
}

window.addEventListener("DOMContentLoaded", () => {
  log("DOM ready");

  const questionJp = document.getElementById("question-jp");
  const answerInput = document.getElementById("answer");
  const checkBtn = document.getElementById("check");
  const result = document.getElementById("result");
  const historyEng = document.getElementById("history-eng");
  const historyJp = document.getElementById("history-jp");

  if (!questionJp || !answerInput || !checkBtn) {
    log("必要な要素が見つからない");
    return;
  }

  // 仮の問題（words.js 未使用）
  const currentWord = {
    jp: "りんご",
    en: "apple"
  };

  questionJp.textContent = currentWord.jp;
  log("問題表示: " + currentWord.jp);

  function judge() {
    const userAnswer = answerInput.value.trim();
    if (!userAnswer) return;

    if (userAnswer.toLowerCase() === currentWord.en) {
      result.textContent = "○ 正解";
    } else {
      result.textContent = "× 不正解";
    }

    historyEng.textContent = currentWord.en;
    historyJp.textContent = currentWord.jp;
    answerInput.value = "";

    log("判定実行: " + userAnswer);
  }

  checkBtn.addEventListener("click", judge);

  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      judge();
    }
  });

  log("イベント登録完了");
});
