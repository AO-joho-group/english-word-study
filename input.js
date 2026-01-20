window.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("check");
  const answerInput = document.getElementById("answer");

  if (!checkBtn || !answerInput) {
    console.error("HTMLとJSのIDが一致していない");
    return;
  }

  checkBtn.addEventListener("click", () => {
    console.log("判定ボタンが押された");
  });

  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log("Enterキー");
    }
  });
});
