//The Sate of the app
const state = {
    activePlayer: 0,
    currentScore: [0, 0],
    totalScore: [0, 0],
    isGamePlaying: true
}


// Winner function
const winner = () => {
    document.querySelector('.winner-' + state.activePlayer)
        .textContent = 'Winner!'
    state.isGamePlaying = false;
}


// Change active Player
const changePlayer = () => {
    // Restoring the active player score to 0
    state.currentScore[state.activePlayer] = 0;
    // Updating the active player current score on the UI
    document.querySelector('.currentScore-' + state.activePlayer)
        .textContent = state.currentScore[state.activePlayer];
    // Changin The active player
    state.activePlayer === 0 ? state.activePlayer = 1 : state.activePlayer = 0;
    // Toggling the active class
    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active');
}

// Roling Dice function
document.querySelector('.rolldice').addEventListener('click', () => {
    if (state.isGamePlaying) {
        // Selecting a Random number between 1 to 6
        const randomNumbers = Math.floor(Math.random() * 6) + 1;
        // Selecting The dice From the DOM
        const dice = document.querySelector('.dice');
        // Randomly Changing The dice number
        dice.src = './images/dice-' + randomNumbers + '.png';

        // Checking Wether The new number is not equals to 1 before proceeding 
        if (randomNumbers !== 1) {
            // Suming up the current score of the active player
            state.currentScore[state.activePlayer] += randomNumbers;
            // Updating the active player's current score on the UI
            document.querySelector('.currentScore-' + state.activePlayer)
                .textContent = state.currentScore[state.activePlayer];
        } else {
            // Changing the active player
            changePlayer();
        }
    }
});




// Hoding function
document.querySelector('.hold').addEventListener('click', () => {
    if (state.isGamePlaying) {
        // Adding The current score to the totalScore of the active player
        state.totalScore[state.activePlayer] += state.currentScore[state.activePlayer];
        console.log(state);
        // Updating the totalScore of the active player on the UI
        document.querySelector('.totalScore-' + state.activePlayer)
            .textContent = state.totalScore[state.activePlayer];
        // Taking the final score value
        const finalScore = document.querySelector('.finalscore').value;

        if (finalScore) {
            //checking wether the winning condition is met
            if (state.totalScore[state.activePlayer] >= finalScore) {
                // calling the winner function
                winner();
            } else {
                // else just change the player
                changePlayer();
            }
            // Adding the default finalScore
        } else if (state.totalScore[state.activePlayer] >= 100) {
            // calling the winner function
            winner();
        } else {
            changePlayer();
        }
    }
});



//New Game function
document.querySelector('.newgame').addEventListener('click', () => {
    // Refeshing the page to set everything to default.
    window.location.reload();
});