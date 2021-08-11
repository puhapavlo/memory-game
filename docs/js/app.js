let cards = document.querySelectorAll('.card');
let restartBtn = document.querySelector('.restart-img');
let mainBlock = document.querySelector('.main');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let disableCardsCount = 0;

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard(){
  if(lockBoard){
    return;
  }

  if(this.querySelector('.front-face') === firstCard){
    return;
  }
  
  this.classList.add('flip-card');
  if(!hasFlippedCard){
    firstCard = this.querySelector('.front-face');
    hasFlippedCard = true;
    return;
  }
  secondCard = this.querySelector('.front-face');;
  hasFlippedCard = false;
  checkCards();
}

function checkCards(){
  lockBoard = true;
  if(firstCard.dataset.name === secondCard.dataset.name){
    disableCards();
  }
  else if(firstCard.dataset.name != secondCard.dataset.name){
    unFlipCards();
  }
}

function disableCards(){
  firstCard.parentNode.removeEventListener('click', flipCard);
  secondCard.parentNode.removeEventListener('click', flipCard);
  disableCardsCount++;
  if(cards.length === disableCardsCount * 2){
    endGame();
  }
  resetBoard();
}

function unFlipCards(){
  setTimeout(() => {
    firstCard.parentNode.classList.remove('flip-card');
    secondCard.parentNode.classList.remove('flip-card');
    resetBoard();
  }, 1500);
}

function endGame(){
  restartBtn.style.top = '50%';
  mainBlock.style.filter = 'blur(8px)';
  restartBtn.addEventListener('click', () => {
    window.location.reload();
  });
}

function resetBoard(){
  [firstCard, secondCard] = [null, null];
  [hasFlippedCard, lockBoard] = [false, false];
}

