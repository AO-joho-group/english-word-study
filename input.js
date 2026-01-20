alert("INPUT JS LOADED");

window.addEventListener("DOMContentLoaded", () => {
  alert("DOM READY");

  const checkBtn = document.getElementById("check");
  const answerInput = document.getElementById("answer");

  console.log(checkBtn, answerInput);
});
