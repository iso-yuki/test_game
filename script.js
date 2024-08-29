// スコアの初期値
let score = 0;

// スコアを表示する要素を取得
const scoreElement = document.getElementById('score');

// ボタンを取得
const button = document.getElementById('scoreButton');

// ボタンがクリックされたときの処理
button.addEventListener('click', () => {
    score += 1; // スコアを増やす
    scoreElement.textContent = score; // スコアを表示
});
