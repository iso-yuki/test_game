// JavaScriptのコード

// 画像とゲームエリアの要素を取得
const image = document.getElementById('movingImage');
const gameArea = document.getElementById('gameArea');

// 画像の移動位置を定義
const positions = [
    { top: '0px', left: '0px' },
    { top: '0px', left: 'calc(50% - 100px)' },
    { top: 'calc(50% - 100px)', left: '0px' },
    { top: 'calc(50% - 100px)', left: 'calc(50% - 100px)' }
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

// ウィンドウサイズの変更に対応するための関数
function adjustImageSize() {
    const gameAreaWidth = gameArea.clientWidth;
    const gameAreaHeight = gameArea.clientHeight;
    
    const img = new Image();
    img.src = image.src;
    img.onload = function() {
        const imgAspect = img.width / img.height;
        const gameAreaAspect = gameAreaWidth / gameAreaHeight;

        if (imgAspect > gameAreaAspect) {
            image.style.width = 'auto';
            image.style.height = '100%';
        } else {
            image.style.width = '100%';
            image.style.height = 'auto';
        }
    };
}

// 初期サイズ調整
adjustImageSize();
// ウィンドウのリサイズイベントに対応
window.addEventListener('resize', adjustImageSize);
