// DOM Elementen
const screens = {
    menu: document.getElementById('menu-screen'),
    game: document.getElementById('game-screen'),
    win: document.getElementById('win-screen')
};

const btnBack = document.getElementById('back-btn');
const btnPlayAgain = document.getElementById('play-again-btn');
const btnSound = document.getElementById('toggle-sound');

let soundEnabled = true;

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    screens[screenName].classList.remove('hidden');
    screens[screenName].classList.add('active');
}

// Moeilijkheid kiezen via grote sterren-knoppen (i.p.v. een dropdown, makkelijker voor jonge kinderen)
let selectedDifficulty = 6;
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedDifficulty = parseInt(button.getAttribute('data-difficulty'));
        difficultyButtons.forEach(b => {
            b.classList.remove('selected');
            b.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
    });
});

// Luister naar klikken op de grote themaknoppen
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');

        startMemoryGame(theme, selectedDifficulty);
        showScreen('game');
    });
});

btnBack.addEventListener('click', () => showScreen('menu'));
btnPlayAgain.addEventListener('click', () => showScreen('menu'));

btnSound.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    btnSound.innerText = soundEnabled ? '🔊 Geluid Aan' : '🔇 Geluid Uit';
});

window.playSound = function(type) {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'flip') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'match') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'win') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.setValueAtTime(600, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(800, ctx.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
    }
};

