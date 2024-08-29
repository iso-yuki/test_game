// プレイヤーの手札を表示する関数
function displayHand(playerHand, playerId) {
    const handElement = document.getElementById(playerId);
    handElement.innerHTML = ''; // 一度手札をクリア

    playerHand.forEach((card, index) => {
        const cardImage = document.createElement('img');
        const imagePath = `images/card_${card.suit}_${String(card.rank).padStart(2, '0')}.png`;
        cardImage.src = imagePath;
        cardImage.style.setProperty('--index', index);
        cardImage.setAttribute('draggable', true); // ドラッグ可能に設定
        cardImage.dataset.index = index; // インデックスをデータ属性に保存
        handElement.appendChild(cardImage);
    });

    // ドラッグアンドドロップのイベントリスナーを設定
    addDragAndDropEventListeners(handElement, playerHand);
}

// ドラッグアンドドロップのイベントリスナーを追加する関数
function addDragAndDropEventListeners(handElement, playerHand) {
    let draggedIndex = null;
    let draggedCard = null;

    handElement.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            draggedIndex = e.target.dataset.index;
            draggedCard = playerHand[draggedIndex]; // ドラッグ中のカードを記録
            e.target.classList.add('dragging');
        }
    });

    handElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingCard = handElement.querySelector('.dragging');
        const target = e.target;
        if (target && target.tagName === 'IMG' && target !== draggingCard) {
            const targetIndex = target.dataset.index;
            if (targetIndex > draggedIndex) {
                handElement.insertBefore(draggingCard, target.nextSibling);
            } else {
                handElement.insertBefore(draggingCard, target);
            }
        }
    });

    handElement.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggingCard = handElement.querySelector('.dragging');
        draggingCard.classList.remove('dragging');

        const targetIndex = [...handElement.children].indexOf(draggingCard);
        playerHand.splice(targetIndex, 0, playerHand.splice(draggedIndex, 1)[0]);

        // 手札の表示を再度更新
        displayHand(playerHand, handElement.id);
    });

    handElement.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });
}
