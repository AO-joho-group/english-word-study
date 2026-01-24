
// デバッグ用
console.log("input.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  // words.js が先に読み込まれている前提
  if (!window.WORDS || !Array.isArray(window.WORDS) || WORDS.length === 0) {
    alert("words.js が読み込まれていないか、WORDS が空です。");
    console.error("WORDS:", window.WORDS);
    return;
  }

  const enEl = document.getElementById("question-en");
  const jpEl = document.getElementById("question-jp");
  const answerEl = document.getElementById("answer");
  const checkBtn = document.getElementById("check");
  const resultEl = document.getElementById("result");
  const historyEn = document.getElementById("history-eng");
  const historyJp = document.getElementById("history-jp");

  let current = null;
  let judging = false; // 連打防止

  // ランダムに1語取得
  function pickWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  // 要素の横幅に収まるように文字サイズを調整（単純版）
  function fitText(el, maxSize, minSize) {
    let size = maxSize;
    el.style.fontSize = size + "px";

    // hidden overflow 対策で一瞬幅を計測
    const originalWhiteSpace = el.style.whiteSpace;
    el.style.whiteSpace = "nowrap";

    while (el.scrollWidth > el.clientWidth && size > minSize) {
      size -= 1;
      el.style.fontSize = size + "px";
    }

    el.style.whiteSpace = originalWhiteSpace || "";
  }

  // 表示更新
  function showWord() {
    current = pickWord();

    // データ形式チェック（eng/jp 必須）
    if (!current || typeof current.eng !== "string" || typeof current.jp !== "string") {
      console.error("単語オブジェクトの形式が不正です:", current);
      enEl.textContent = "データ形式エラー";
      jpEl.textContent = "words.js の { eng, jp } を確認してください";
      resultEl.textContent = "";
      return;
    }

    enEl.textContent = current.eng;
    jpEl.textContent = current.jp;

    // レスポンシブに文字サイズ調整（必要に応じて調整）
    fitText(enEl, 48, 20);
    fitText(jpEl, 32, 16);

    // 入力欄リセット
    answerEl.value = "";
    resultEl.textContent = "";
    judging = false;
    checkBtn.disabled = false;

    // フォーカス戻す
    answerEl.focus();
  }

  // 判定（英字のゆらぎを最低限吸収：前後空白・大文字小文字）
  function normalize(str) {
    return (str || "")
      .trim()
      .toLowerCase();
  }

  function judge() {
    if (judging) return;
    judging = true;
    checkBtn.disabled = true;

    if (!current) {
      console.warn("current が未設定です。showWord() を先に実行します。");
      showWord();
      return;
    }

    const input = normalize(answerEl.value);
    const correct = normalize(current.eng);

    if (input === correct) {
      resultEl.textContent = "正解";
      resultEl.style.color = "#1a7f37"; // 緑
    } else {
      resultEl.textContent = `正解：${current.eng}`;
      resultEl.style.color = "#b3261e"; // 赤
    }

    // 履歴更新
    historyEn.textContent = current.eng;
    historyJp.textContent = current.jp;

    // 次の問題へ
    setTimeout(showWord, 900);
  }

  // イベント登録
  checkBtn.addEventListener("click", judge);

  answerEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      judge();
    }
  });

  // 初回表示
  showWord();
});
