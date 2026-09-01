// js/memory.js

document.addEventListener('DOMContentLoaded', () => {
    // Een uitgebreide lijst met emoticons zodat er altijd genoeg unieke zijn
    const allEmojis = ['🐶', '🐱', '🦊', '🐼', '🦁', '🐵', '🐸', '🦄', '🍎', '🍌', '🚗', '🚀', '⭐', '⚽', '🎸', '🍦'];
    
    const grid = document.getElementById('memory-grid'); // Zorg dat je ID in HTML hiermee overeenkomt
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    
    // Aantal paren (bijv. 8 paren = 16 kaarten)
    const totalPairs = 8; 

    function createBoard() {
        // 1. Pak een willekeurige selectie van unieke emoticons op basis van het aantal paren
        allEmojis.sort(() => 0.5 - Math.random());
        const selectedEmojis = allEmojis.slice(0, totalPairs);
        
        // 2. Verdubbel ze zodat we paren krijgen en schud ze door elkaar
        const gameEmojis = [...selectedEmojis, ...selectedEmojis];
        gameEmojis.sort(() => 0.5 - Math.random());

        grid.innerHTML = '';
        cardsWon = [];

        // 3. Bouw de kaarten op het scherm
        for (let i = 0; i < gameEmojis.length; i++) {
            const card = document.createElement('div');
            card.setAttribute('class', 'memory-card');
            card.setAttribute('data-id', i);
            card.dataset.emoji = gameEmojis[i]; // Sla de emoji op in een data-attribute
            
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        const selectedCard = this;
        const cardId = selectedCard.getAttribute('data-id');

        // Als de kaart al goed is (matched) of al open ligt, doe dan niks
        if (selectedCard.classList.contains('matched') || selectedCard.classList.contains('flipped')) {
            return;
        }

        // Voorkom dat je op dezelfde kaart klikt of meer dan 2 tegelijk selecteert
        if (cardsChosenId.length === 1 && cardsChosenId[0] === cardId) {
            return;
        }

        selectedCard.classList.add('flipped');
        selectedCard.textContent = selectedCard.dataset.emoji;
        
        cardsChosen.push(selectedCard.dataset.emoji);
        cardsChosenId.push(cardId);

        // Als er 2 kaarten zijn geselecteerd, controleren op een match
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.memory-card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (optionOneId === optionTwoId) {
            // Zelfde kaart dubbel geklikt
            cards[optionOneId].classList.remove('flipped');
            cards[optionOneId].textContent = '';
        } else if (cardsChosen[0] === cardsChosen[1]) {
            // MATCH! Geef ze de 'matched' class zodat ze niet meer klikbaar zijn
            cards[optionOneId].classList.add('matched');
            cards[optionTwoId].classList.add('matched');
            cardsWon.push(cardsChosen);
        } else {
            // Geen match, draai ze weer om
            cards[optionOneId].classList.remove('flipped');
            cards[optionOneId].textContent = '';
            cards[optionTwoId].classList.remove('flipped');
            cards[optionTwoId].textContent = '';
        }

        cardsChosen = [];
        cardsChosenId = [];

        // Geef eventueel een melding als alle paren gevonden zijn
        if (cardsWon.length === totalPairs) {
            setTimeout(() => {
                alert('Gefeliciteerd! Alle paren zijn gevonden! 🎉');
            }, 300);
        }
    }

    createBoard();
});