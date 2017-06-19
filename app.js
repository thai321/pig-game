/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gameState;

function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0; // by default, first player is player 1
	gameState = true; // the game is not over

	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player1';
	document.getElementById('name-1').textContent = 'Player2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

// start the game
init();

document.querySelector('.btn-roll').addEventListener("click" , function(){
	if (gameState) {
		dice = Math.floor(Math.random() * 6) + 1;

		var diceDom = document.querySelector('.dice');
		diceDom.style.display = 'block';
		diceDom.src = 'dice-' + dice + '.png';

		// update the score if dice is not a 1
		if (dice != 1){
			roundScore += dice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
			// document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else { // roll a 1
			nextPlayer();
		}
	}

});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gameState) {
		// add the current score roundScore to current player score
		scores[activePlayer] += roundScore;

		// update the UI of the current player
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		//check for winning status
		if (scores[activePlayer] >= 20) {
			document.querySelector('#name-' + activePlayer).textContent = "Winner!";
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gameState = false; // the game is over, we have a winner
		} else {
			nextPlayer();
		}
	}
	

});


function nextPlayer() {
		document.querySelector('.player-' + activePlayer +  '-panel').classList.toggle('active');

		// switch player and set roundScore to 0
		activePlayer = (activePlayer === 0) ? 1 : 0;
		roundScore = 0;

		//update pannel
		document.querySelector('.player-' + activePlayer +  '-panel').classList.toggle('active');

		// set both players score to 0
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		//set hide the dice pic
		document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init );

