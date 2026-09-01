// js/memory.js

const themeEmojis = {
    superheroes: ['🦸‍♂️', '🦸‍♀️', '🦹‍♂️', '⚡', '🔥', '🛡️', '⭐', '💥'],
    animals: ['🐶', '🐱', '🦊', '🐼', '🦁', '🐵', '🐸', '🦄'],
    cars: ['🚗', '🚕', '🚙', '🚌', '🏎️', '🚓', '🚒', '🚚']
};

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let totalPairs = 8; 

// Vang de thema en moeilijkheid op die vanuit main.js worden meegegeven
function startMemoryGame(selectedTheme = 'animals', totalCards = 16) {
    const grid = document.getElementById('game-board');
    
    if (!grid) {
        console.error("Kan het speelveld (#game-board) niet vinden in de HTML!");
        return;
    }
    
    totalPairs = totalCards / 2;
    let availableEmojis = themeEmojis[selectedTheme] || themeEmojis.animals;

    // 1. Unieke emoticons selecteren op basis van het aantal benodigde paren
    availableEmojis.sort(() => 0.5 - Math.random());
    const selectedEmojis = availableEmojis.slice(0, totalPairs);
    
    // 2. Verdubbelen en schudden voor de paren
    const gameEmojis = [...selectedEmojis, ...selectedEmojis];
    gameEmojis.sort(() => 0.5 - Math.random());

    grid.innerHTML = '';
    cardsWon = [];
    cardsChosen = [];
    cardsChosenId = [];

    // 3. Bouw de kaarten op het bord
    for (let i = 0; i < gameEmojis.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'memory-card');
        card.setAttribute('data-id', i);
        card.dataset.emoji = gameEmojis[i];
        
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

function flipCard() {
    const selectedCard = this;
    const cardId = selectedCard.getAttribute('data-id');

    if (selectedCard.classList.contains('matched') || selectedCard.classList.contains('flipped')) {
        return;
    }

    if (cardsChosenId.length === 1 && cardsChosenId[0] === cardId) {
        return;
    }

    selectedCard.classList.add('flipped');
    selectedCard.textContent = selectedCard.dataset.emoji;
    
    cardsChosen.push(selectedCard.dataset.emoji);
    cardsChosenId.push(cardId);

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.memory-card');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
        cards[optionOneId].classList.remove('flipped');
        cards[optionOneId].textContent = '';
    } else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].classList.add('matched');
        cards[optionTwoId].classList.add('matched');
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].classList.remove('flipped');
        cards[optionOneId].textContent = '';
        cards[optionTwoId].classList.remove('flipped');
        cards[optionTwoId].textContent = '';
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === totalPairs) {
        setTimeout(() => {
            const winScreen = document.getElementById('win-screen');
            const gameScreen = document.getElementById('game-screen');
            if (winScreen && gameScreen) {
                gameScreen.classList.add('hidden');
                winScreen.classList.remove('hidden');
            } else {
                alert('Gefeliciteerd! Alle paren zijn gevonden! 🎉');
            }
        }, 300);
    }
}

window.startMemoryGame = startMemoryGame;