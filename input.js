alert("INPUT JS LOADED");

window.addEventListener("DOMContentLoaded", () => {
  alert("DOM READY");

  const checkBtn = document.getElementById("check");
  const answerInput = document.getElementById("answer");

  console.log("check:", checkBtn);
  console.log("answer:", answerInput);

  if (!checkBtn || !answerInput) {
    alert("IDがHTMLと一致していない");
    return;
  }

  checkBtn.addEventListener("click", () => {
    alert("clicked");
  });
});
