// js/memory.js

const allEmojis = ['🐶', '🐱', '🦊', '🐼', '🦁', '🐵', '🐸', '🦄', '🍎', '🍌', '🚗', '🚀', '⭐', '⚽', '🎸', '🍦'];

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
const totalPairs = 8; 

// Functie wordt aangeroepen door main.js
function startMemoryGame() {
    // Zoek naar 'memory-grid' of 'grid' in je HTML
    const grid = document.getElementById('memory-grid') || document.getElementById('grid');
    
    if (!grid) {
        console.error("Kan het speelveld (grid) niet vinden in de HTML!");
        return;
    }
    
    // 1. Unieke emoticons selecteren
    allEmojis.sort(() => 0.5 - Math.random());
    const selectedEmojis = allEmojis.slice(0, totalPairs);
    
    // 2. Verdubbelen en schudden
    const gameEmojis = [...selectedEmojis, ...selectedEmojis];
    gameEmojis.sort(() => 0.5 - Math.random());

    grid.innerHTML = '';
    cardsWon = [];
    cardsChosen = [];
    cardsChosenId = [];

    // 3. Kaarten opbouwen
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

    // Al gevonden of al open? Doe niks.
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
        // MATCH: Maak ze onklikbaar
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
            alert('Gefeliciteerd! Alle paren zijn gevonden! 🎉');
        }, 300);
    }
}

// Zorg dat de functie globaal beschikbaar is voor main.js
window.startMemoryGame = startMemoryGame;