const themes = {
    superheroes: ['🦸‍♂️', '🦸‍♀️', '🦹‍♂️', '🦹‍♀️', '🦸', '🦹', '🦇', '🕷️'],
    animals: ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
    cars: ['🚗', '🚓', '🚑', '🚒', '🚐', '🚚', '🚜', '🏎️']
};

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;
let lockBoard = false;

function startMemoryGame(theme, numCards) {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; 
    board.setAttribute('data-cards', numCards); 
    
    matchedPairs = 0;
    totalPairs = numCards / 2;
    flippedCards = [];
    lockBoard = false;

    let selectedImages = themes[theme].slice(0, totalPairs);
    cards = [...selectedImages, ...selectedImages];
    cards.sort(() => Math.random() - 0.5);

    cards.forEach(item => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.item = item;

        const content = document.createElement('span');
        content.classList.add('content');
        content.innerText = item;
        
        cardElement.appendChild(content);
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return; 

    this.classList.add('flipped');
    window.playSound('flip');
    
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = flippedCards[0].dataset.item === flippedCards[1].dataset.item;

    if (isMatch) {
        window.playSound('match');
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        matchedPairs++;
        resetBoard();

        if (matchedPairs === totalPairs) {
            setTimeout(showWinScreen, 500);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [flippedCards, lockBoard] = [[], false];
}

function showWinScreen() {
    window.playSound('win');
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.remove('hidden');
    document.getElementById('win-screen').classList.add('active');
}