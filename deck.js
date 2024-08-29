// デッキの初期化
let deck = [];
const suits = ['club', 'diamond', 'heart', 'spade'];
const ranks = Array.from({ length: 13 }, (_, i) => i + 1);

// スートと数字の配列を定義
suits.forEach(suit => {
    ranks.forEach(rank => {
        deck.push({ suit: suit, rank: rank });
    });
});

// デッキをシャッフルする関数
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// デッキをシャッフル
shuffle(deck);

// プレイヤーの手札を初期化
let player1Hand = [];
let player2Hand = [];

// 各プレイヤーに15枚ずつ配る
for (let i = 0; i < 15; i++) {
    player1Hand.push(deck.pop());
    player2Hand.push(deck.pop());
}

// エクスポート（モジュールを使用している場合）
export { player1Hand, player2Hand, deck };
