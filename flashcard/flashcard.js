if (!window.words || window.words.length === 0) {
  alert("words.js が読み込まれていません");
}

// シャッフル済み単語
const words = [...window.words].sort(() => Math.random() - 0.5);

let index = 0;
let showEnglish = true;

const wordEl = document.getElementById("word");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function render() {
  if (!wordEl || words.length === 0) return;
  const w = words[index];
  wordEl.textContent = showEnglish ? w[0] : w[1];
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

// タップで英⇄日
wordEl.addEventListener("click", () => {
  showEnglish = !showEnglish;
  render();
});

// ボタン操作
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

// 初期表示
render();
