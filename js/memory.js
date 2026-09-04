// js/memory.js[cite: 4]

const themeEmojis = {
    superheroes: ['🦸‍♂️', '🦸‍♀️', '🦹‍♂️', '⚡', '🔥', '🛡️', '⭐', '💥'],
    animals: ['🐶', '🐱', '🦊', '🐼', '🦁', '🐵', '🐸', '🦄'],
    cars: ['🚗', '🚕', '🚙', '🚌', '🏎️', '🚓', '🚒', '🚚'],
    fruit: ['🍎', '🍌', '🍓', '🍇', '🍊', '🍉', '🍑', '🍍'],
    ocean: ['🐠', '🐙', '🐳', '🦀', '🐬', '🐡', '🦈', '🐚']
};

// Nederlandse namen per emoji, voor schermlezers[cite: 4]
const emojiLabels = {
    '🦸‍♂️': 'superheld', '🦸‍♀️': 'superheldin', '🦹‍♂️': 'schurk', '⚡': 'bliksem',
    '🔥': 'vuur', '🛡️': 'schild', '⭐': 'ster', '💥': 'explosie',
    '🐶': 'hond', '🐱': 'kat', '🦊': 'vos', '🐼': 'panda',
    '🦁': 'leeuw', '🐵': 'aap', '🐸': 'kikker', '🦄': 'eenhoorn',
    '🚗': 'auto', '🚕': 'taxi', '🚙': 'suv', '🚌': 'bus',
    '🏎️': 'raceauto', '🚓': 'politieauto', '🚒': 'brandweerwagen', '🚚': 'vrachtwagen',
    '🍎': 'appel', '🍌': 'banaan', '🍓': 'aardbei', '🍇': 'druiven',
    '🍊': 'sinaasappel', '🍉': 'watermeloen', '🍑': 'perzik', '🍍': 'ananas',
    '🐠': 'vis', '🐙': 'octopus', '🐳': 'walvis', '🦀': 'krab',
    '🐬': 'dolfijn', '🐡': 'kogelvis', '🦈': 'haai', '🐚': 'schelp'
};

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let totalPairs = 8;

// Correcte Fisher-Yates shuffle: husselt het array in place en geeft het terug[cite: 4]
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start de game op basis van het gekozen thema en de moeilijkheid[cite: 4]
function startMemoryGame(selectedTheme = 'animals', totalCards = 16) {
    const grid = document.getElementById('game-board');
    
    if (!grid) {
        console.error("Kan het speelveld (#game-board) niet vinden in de HTML!");
        return;
    }
    
    totalPairs = totalCards / 2;
    let availableEmojis = themeEmojis[selectedTheme] || themeEmojis.animals;

    // 1. Unieke emoticons selecteren[cite: 4]
    shuffleArray(availableEmojis);
    const selectedEmojis = availableEmojis.slice(0, totalPairs);

    // 2. Verdubbelen en schudden voor de paren[cite: 4]
    const gameEmojis = [...selectedEmojis, ...selectedEmojis];
    shuffleArray(gameEmojis);

    grid.innerHTML = '';
    cardsWon = [];
    cardsChosen = [];
    cardsChosenId = [];

    // Grid netjes laten centreren i.p.v. altijd 4 vaste kolommen[cite: 4]
    grid.classList.remove('cols-3', 'cols-4');
    grid.classList.add(totalCards <= 6 ? 'cols-3' : 'cols-4');

    // 3. Bouw de kaarten op het bord[cite: 4]
    for (let i = 0; i < gameEmojis.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'memory-card');
        card.setAttribute('data-id', i);
        card.dataset.emoji = gameEmojis[i];
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Kaart, verborgen');

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
    selectedCard.setAttribute('aria-label', 'Kaart, omgedraaid');

    // Speel geluid af bij het omdraaien[cite: 4]
    if (window.playSound) window.playSound('flip');

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
        cards[optionOneId].setAttribute('aria-label', 'Kaart, verborgen');
    } else if (cardsChosen[0] === cardsChosen[1]) {
        // MATCH: Maak ze onklikbaar en speel match-geluid[cite: 4]
        const label = emojiLabels[cardsChosen[0]] || 'onbekend';
        cards[optionOneId].classList.add('matched');
        cards[optionTwoId].classList.add('matched');
        cards[optionOneId].setAttribute('aria-label', `Kaart, gevonden: ${label}`);
        cards[optionTwoId].setAttribute('aria-label', `Kaart, gevonden: ${label}`);
        cardsWon.push(cardsChosen);
        if (window.playSound) window.playSound('match');
    } else {
        cards[optionOneId].classList.remove('flipped');
        cards[optionOneId].textContent = '';
        cards[optionOneId].setAttribute('aria-label', 'Kaart, verborgen');
        cards[optionTwoId].classList.remove('flipped');
        cards[optionTwoId].textContent = '';
        cards[optionTwoId].setAttribute('aria-label', 'Kaart, verborgen');
    }

    cardsChosen = [];
    cardsChosenId = [];

    // Als alle paren gevonden zijn, toon het win-scherm
    if (cardsWon.length === totalPairs) {
        setTimeout(() => {
            if (window.playSound) window.playSound('win');
            
            const winScreen = document.getElementById('win-screen');
            const gameScreen = document.getElementById('game-screen');
            
            if (winScreen && gameScreen) {
                // Verberg het speelbord
                gameScreen.classList.remove('active');
                gameScreen.classList.add('hidden');
                
                // Activeer het win-scherm op dezelfde manier als de andere schermen
                winScreen.classList.remove('hidden');
                winScreen.classList.add('active');
            } else {
                alert('Gefeliciteerd! Alle paren zijn gevonden! 🎉');
            }
        }, 300);
    }
}

window.startMemoryGame = startMemoryGame;