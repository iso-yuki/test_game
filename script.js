// JavaScriptのコード

// 画像とゲームエリアの要素を取得
const image = document.getElementById('movingImage');
const gameArea = document.getElementById('gameArea');

// 画像の移動位置を定義
const positions = [
    { top: '0px', left: '0px' },
    { top: '0px', left: 'calc(100% - 100px)' },
    { top: 'calc(100% - 100px)', left: '0px' },
    { top: 'calc(100% - 100px)', left: 'calc(100% - 100px)' }
];

// クリック時に画像を移動させる関数
function moveImage() {
    // ランダムな位置を選択
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    
    // 画像の位置を変更
    image.style.top = randomPosition.top;
    image.style.left = randomPosition.left;
}

// 画像がクリックされたときのイベントリスナー
image.addEventListener('click', moveImage);
