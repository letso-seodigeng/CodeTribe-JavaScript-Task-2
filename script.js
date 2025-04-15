document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.memory-card');
    const resetButton = document.querySelector('.reset-button');

    let letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

    let hasFlippedCard = false;
    let lockGame = false;
    let firstCard, secondCard;

    function shuffle(array) {

        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);

            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;

        }

        return array;

    }

    function setupGame() {

        let shuffledLetters = shuffle(letters);

        cards.forEach((card, index) => {

            card.classList.remove('flip', 'matched');

            const frontFace = card.querySelector('.front-face');
    
            card.dataset.letter = shuffledLetters[index];
            if (frontFace) {
    
                frontFace.textContent = shuffledLetters[index];
    
            }

            card.removeEventListener('click', flipCard);
            card.addEventListener('click', flipCard);
    
        });

    }



    function flipCard() {

        if (lockGame) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {

            hasFlippedCard = true;
            firstCard = this;

            return;

        }

        secondCard = this;

        checkMatch();

    }

    function checkMatch() {

        lockGame = true;

        let isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

        isMatch ? disableCards() : unflipCards();

    }

    function disableCards() {

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        resetGame();

    }

    function unflipCards() {

        setTimeout(() => {

            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetGame();

        }, 1000);

    }

    function resetGame() {

        hasFlippedCard = false;
        lockGame = false;
        firstCard = null;
        secondCard = null;

    }

    if (resetButton) {

        resetButton.addEventListener('click', setupGame);

    }

    setupGame();

});