// 単語データ（例：最低限）
const words = [
  { eng: "apple", jp: "りんご" },
  { eng: "run", jp: "走る" },
  { eng: "blue", jp: "青い" },
  { eng: "book", jp: "本" },
  { eng: "eat", jp: "食べる" }
];

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const overlayEl = document.getElementById("overlay");

const historyEngEl = document.getElementById("history-eng");
const historyJpEl = document.getElementById("history-jp");

let currentWord = null;

// 配列シャッフル
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// 完全ランダム取得
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// 出題
function showQuestion() {
  currentWord = getRandomWord();
  questionEl.textContent = currentWord.eng;

  const wrongChoices = shuffle(
    words.filter(w => w.jp !== currentWord.jp)
  ).slice(0, 3);

  const choices = shuffle([
    currentWord.jp,
    ...wrongChoices.map(w => w.jp)
  ]);

  choicesEl.innerHTML = "";
  choices.forEach(jp => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = jp;
    btn.onclick = () => judge(jp);
    choicesEl.appendChild(btn);
  });
}

// 判定
function judge(answer) {
  const correct = answer === currentWord.jp;

  overlayEl.textContent = correct ? "正解" : "不正解";
  overlayEl.style.display = "flex";

  // 直前問題ログ更新
  historyEngEl.textContent = currentWord.eng;
  historyJpEl.textContent = currentWord.jp;

  setTimeout(() => {
    overlayEl.style.display = "none";
    showQuestion();
  }, 800);
}

// 初期化
showQuestion();
