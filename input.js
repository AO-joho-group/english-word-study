let currentWord = null;

const jpEl = document.getElementById("question-jp");
const answerEl = document.getElementById("answer");
const resultEl = document.getElementById("result");

const historyEngEl = document.getElementById("history-eng");
const historyJpEl = document.getElementById("history-jp");

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function nextQuestion() {
  currentWord = getRandomWord();
  jpEl.textContent = currentWord.jp;

  answerEl.value = "";
  resultEl.textContent = "";
  resultEl.className = "";
}

function checkAnswer() {
  const input = answerEl.value.trim().toLowerCase();
  const correct = currentWord.eng.toLowerCase();

  if (!input) return;

  if (input === correct) {
    resultEl.textContent = "正解";
    resultEl.className = "correct";

    historyEngEl.textContent = currentWord.eng;
    historyJpEl.textContent = currentWord.jp;

    setTimeout(nextQuestion, 600);
  } else {
    resultEl.textContent = "不正解";
    resultEl.className = "incorrect";
  }
}

document.getElementById("check").addEventListener("click", checkAnswer);
answerEl.addEventListener("keydown", e => {
  if (e.key === "Enter") checkAnswer();
});

nextQuestion();
