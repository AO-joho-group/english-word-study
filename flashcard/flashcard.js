if (!window.WORDS || window.WORDS.length === 0) {
  alert("words.js が読み込まれていません");
}

// シャッフル
const words = [...window.WORDS].sort(() => Math.random() - 0.5);

let index = 0;
let showEnglish = true;

const wordEl = document.getElementById("word");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

/* フォント自動調整（1行固定） */
function fitText() {
  const MAX = 64; // px
  const MIN = 28; // px

  let size = MAX;
  wordEl.style.fontSize = size + "px";

  while (wordEl.scrollWidth > wordEl.clientWidth && size > MIN) {
    size -= 2;
    wordEl.style.fontSize = size + "px";
  }
}

function render() {
  const w = words[index];
  wordEl.textContent = showEnglish ? w.eng : w.jp;
  fitText();
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

// 単語タップで 英語⇔日本語
wordEl.addEventListener("click", () => {
  showEnglish = !showEnglish;
  render();
});

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

// 初期表示
render();
