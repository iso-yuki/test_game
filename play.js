// プレイボタンがクリックされたときの処理
document.getElementById('play-button').addEventListener('click', function() {
    const selectedCards = document.querySelectorAll('.hand img.selected');
    const playArea = document.getElementById('play-area');
    
    selectedCards.forEach(card => {
        card.style.width = '60px'; // プレイエリア内でのカードの幅を設定
        card.style.height = 'auto'; // 高さは自動調整
        playArea.appendChild(card); // プレイエリアにカードを移動
        card.classList.remove('selected'); // 選択状態を解除
    });
});

// カードがクリックされたときに選択状態をトグルする
function setupCardSelection() {
    document.querySelectorAll('.hand img').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}
