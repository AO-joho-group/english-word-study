if (!window.WORDS || window.WORDS.length === 0) {
  alert("words.js が読み込まれていません");
}

let index = 0;
let showEnglish = true;

// シャッフル
const words = [...window.WORDS].sort(() => Math.random() - 0.5);

const wordEl = document.getElementById("word");

function render() {
  const w = words[index];
  wordEl.textContent = showEnglish ? w.en : w.jp;
}

function next() {
  index = (index + 1) % words.length;
  showEnglish = true;
  render();
}

function prev() {
  index = (index - 1 + words.length) % words.length;
  showEnglish = true;
  render();
}

// クリック / タップで切替
wordEl.addEventListener("click", () => {
  showEnglish = !showEnglish;
  render();
});

// キー操作
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "Enter") next();
  if (e.key === "ArrowLeft") prev();
  if (e.key === " ") {
    e.preventDefault();
    showEnglish = !showEnglish;
    render();
  }
});

render();

document.getElementById("next").addEventListener("click", next);
document.getElementById("prev").addEventListener("click", prev);

