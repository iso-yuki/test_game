// スコアと時間の初期値
let score = 0;
let timeLeft = 10; // タイマーの初期値（秒）
let timer;

// 要素を取得
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const button = document.getElementById('scoreButton');
const startButton = document.getElementById('startButton');

// ボタンがクリックされたときの処理
button.addEventListener('click', () => {
    if (timeLeft > 0) { // タイマーがまだ動いている場合のみ
        score += 1; // スコアを増やす
        scoreElement.textContent = score; // スコアを表示
    }
});

// スタートボタンがクリックされたときの処理
startButton.addEventListener('click', () => {
    // スコアとタイマーをリセット
    score = 0;
    timeLeft = 10; // タイマーの初期値をセット
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    
    // タイマーをセット
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(updateTimer, 1000); // 1秒ごとにupdateTimer関数を呼び出す
});

// タイマーの更新処理
function updateTimer() {
    timeLeft -= 1; // 残り時間を1秒減らす
    timeElement.textContent = timeLeft; // 残り時間を表示

    if (timeLeft <= 0) {
        clearInterval(timer); // タイマーを停止
        alert('時間切れ! あなたのスコアは ' + score + ' です。'); // スコアを表示するアラート
    }
}
