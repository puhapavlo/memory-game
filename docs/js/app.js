let cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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
  lockBoard = false;
}

function unFlipCards(){
  setTimeout(() => {
    firstCard.parentNode.classList.remove('flip-card');
    secondCard.parentNode.classList.remove('flip-card');
    lockBoard = false;
  }, 1500);
}

