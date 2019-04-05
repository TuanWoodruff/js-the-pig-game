/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*eslint-env browser*/

var scores, roundScore, activePlayer, dice, previousDice, startingScore;
var diceDOM = document.querySelector('.dice');


init();



function init() {
    "use strict";
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    startingScore = prompt("Please enter the winning score! Default winning score is 100");
    if (startingScore < 1) {
        startingScore = 100;
    }
}

function nextPlayer() {
    "use strict";
    roundScore = 0;
    previousDice = 0;
    dice = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.player-' + activePlayer);
    diceDOM.style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function btn() {

    // 1. Random Number
    "use strict";
    previousDice = dice;
    dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    if (dice === 6 && previousDice === 6) {
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    } else if (dice !== 1) {
        // Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    
    } else {
        // Next Player
        nextPlayer();
    }
    
});


document.querySelector('.btn-hold').addEventListener('click', function () {

    // Add current score to the global score
    "use strict";
    scores[activePlayer] += roundScore;
    
    // Update UI 
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    
    // Check if player won the game
    if (scores[activePlayer] >= startingScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        diceDOM.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    } else {
        nextPlayer();
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);











