import { player1Hand, player2Hand } from './deck.js';
import { displayHand, setupCardSelection } from './hand.js';
import { setupPlayButton } from './play.js';

// 初期設定
function initializeGame() {
    sortHand(player1Hand);
    sortHand(player2Hand);
    displayHand(player1Hand, 'player1-hand');
    displayHand(player2Hand, 'player2-hand');
    setupCardSelection();
    setupPlayButton();
}

initializeGame();
