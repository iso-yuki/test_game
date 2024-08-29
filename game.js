// // スートと数字の配列を定義
// const suits = ['club', 'diamond', 'heart', 'spade'];
// const ranks = Array.from({ length: 13 }, (_, i) => i + 1);

// // デッキの初期化
// let deck = [];
// suits.forEach(suit => {
//     ranks.forEach(rank => {
//         deck.push({ suit: suit, rank: rank });
//     });
// });

// // デッキをシャッフルする関数
// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// // デッキをシャッフル
// shuffle(deck);

// // プレイヤーの手札を初期化
// let player1Hand = [];
// let player2Hand = [];

// // 各プレイヤーに15枚ずつ配る
// for (let i = 0; i < 15; i++) {
//     player1Hand.push(deck.pop());
//     player2Hand.push(deck.pop());
// }

import { player1Hand, player2Hand, deck } from "./deck"

// カードのソートロジック
function sortHand(hand) {
    const order = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2];
    hand.sort((a, b) => {
        const rankComparison = order.indexOf(a.rank) - order.indexOf(b.rank);
        if (rankComparison !== 0) return rankComparison;
        return suits.indexOf(a.suit) - suits.indexOf(b.suit);
    });
}

// ソートボタンがクリックされたときの動作
document.getElementById('sort-button').addEventListener('click', () => {
    sortHand(player1Hand);
    sortHand(player2Hand);
    displayHand(player1Hand, 'player1-hand');
    displayHand(player2Hand, 'player2-hand');
});

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
        cardImage.addEventListener('click', function() {
            handleCardClick(this, playerId);
        });
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

// 選択されたカードを処理する関数
function handleCardClick(cardElement, playerId) {
    const cardIndex = cardElement.dataset.index;
    const card = (playerId === 'player1-hand') ? player1Hand[cardIndex] : player2Hand[cardIndex];
    
    if (cardElement.classList.contains('selected')) {
        // 選択されたカードを手札に戻す
        if (playerId === 'player1-hand') {
            player1Hand.splice(cardIndex, 0, card);
        } else {
            player2Hand.splice(cardIndex, 0, card);
        }
        // カードをselected-cards-areaから削除
        document.getElementById('selected-cards-area').removeChild(cardElement);
    } else {
        // カードを選択状態にする
        cardElement.classList.add('selected');
        // カードを手札から削除
        if (playerId === 'player1-hand') {
            player1Hand.splice(cardIndex, 1);
        } else {
            player2Hand.splice(cardIndex, 1);
        }
        // 選択されたカードをselected-cards-areaに移動
        const selectedCardsArea = document.getElementById('selected-cards-area');
        const newCardElement = document.createElement('img');
        const imagePath = `images/card_${card.suit}_${String(card.rank).padStart(2, '0')}.png`;
        newCardElement.src = imagePath;
        newCardElement.style.width = '60px';
        newCardElement.style.height = 'auto';
        newCardElement.classList.add('selected');
        newCardElement.dataset.suit = card.suit;
        newCardElement.dataset.rank = card.rank;
        newCardElement.addEventListener('click', function() {
            handleSelectedCardClick(this);
        });
        selectedCardsArea.appendChild(newCardElement);
    }

    // 手札とselected-cards-areaの表示を更新
    sortHand(player1Hand);
    sortHand(player2Hand);
    displayHand(player1Hand, 'player1-hand');
    displayHand(player2Hand, 'player2-hand');
    sortSelectedCards();
}

// selected-cards-area内のカードをソートする関数
function sortSelectedCards() {
    const selectedCardsArea = document.getElementById('selected-cards-area');
    const cards = Array.from(selectedCardsArea.children);
    const order = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2];

    cards.sort((a, b) => {
        const rankComparison = order.indexOf(parseInt(a.dataset.rank)) - order.indexOf(parseInt(b.dataset.rank));
        if (rankComparison !== 0) return rankComparison;
        return suits.indexOf(a.dataset.suit) - suits.indexOf(b.dataset.suit);
    });

    // ソート後のカードをselected-cards-areaに再表示
    selectedCardsArea.innerHTML = '';
    cards.forEach(card => selectedCardsArea.appendChild(card));
}

// 選択されたカードをクリックしたときの処理
function handleSelectedCardClick(cardElement) {
    // カードのデータを取得
    const suit = cardElement.dataset.suit;
    const rank = parseInt(cardElement.dataset.rank);

    // 手札にカードを追加
    const card = { suit, rank };
    player1Hand.push(card); // ここでは例としてplayer1Handに追加しています。必要に応じて修正してください。

    // selected-cards-areaからカードを削除
    document.getElementById('selected-cards-area').removeChild(cardElement);

    // 手札とselected-cards-areaの表示を更新
    sortHand(player1Hand);
    displayHand(player1Hand, 'player1-hand');
    sortSelectedCards();
}

// 初期設定
sortHand(player1Hand);
sortHand(player2Hand);
displayHand(player1Hand, 'player1-hand');
displayHand(player2Hand, 'player2-hand');
sortSelectedCards();

// プレイボタンがクリックされたときの処理
document.getElementById('play-button').addEventListener('click', function() {
    const selectedCards = document.querySelectorAll('#selected-cards-area img');
    const playArea = document.getElementById('play-area');
    
    selectedCards.forEach(card => {
        card.style.width = '60px'; // プレイエリア内でのカードの幅を設定
        card.style.height = 'auto'; // 高さは自動調整
        playArea.appendChild(card); // プレイエリアにカードを移動
        card.classList.remove('selected'); // 選択状態を解除
    });

    // 選択されたカードをクリア
    document.getElementById('selected-cards-area').innerHTML = '';
});
