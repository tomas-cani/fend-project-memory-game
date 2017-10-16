let checkingMatch = false;

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function handleCardClick(e) {
  const cardElement = $(e.target);
  // Game starts and timer starts running
  if (moves == 0 && openCards.length == 0) {
    startTimer();
  }
  if (!checkingMatch) {
    displayCard(cardElement);
    addToOpenCards(cardElement);
    if (openCards.length == 2) {
      checkingMatch = true;
      if (checkMatch()) {
        handleMatch();
      } else {
        handleNoMatch();
      }
      afterMove();
    }
  }
}

// Puts the card up
function displayCard(cardElement) {
  cardElement.off('click');
  cardElement.addClass('open show');
}

// Used to check for matches
function addToOpenCards(cardElement) {
  openCards.push(cardElement);
}

function checkMatch() {
  const cardClasses = openCards
  // get the i classes
  .map((card) => {
    return card.find('i').attr('class');
  })
  // get the icon class
  .map((classes) => {
    return classes.split(' ').find((className) => {
      return className.includes('fa-');
    });
  });
  // check if they are equal
  return cardClasses[0] == cardClasses[1];
}

// Keep the cards up and update the remaining matches
function handleMatch() {
  openCards.forEach((openCard) => {
    openCard.off('click');
    openCard.addClass('match');
  });
  remainingMatches--;
  checkingMatch = false;
}

// Flip cards after a sec
function handleNoMatch() {
  openCards.forEach((openCard) => {
    setTimeout(() => {
      openCard.removeClass('open show');
      openCard.click(handleCardClick);
      checkingMatch = false;
    }, 1000)
  });
}

// Update moves, star rating and check for win
function afterMove() {
  setMoves(++moves);
  checkStarRating(moves);
  openCards = [];
  checkWin();
}

// If there are no matches remaining it shows the win screen
function checkWin() {
  if (remainingMatches == 0) {
    clearInterval(timer);

    $('.modal-body').empty();
    $('.stars').clone().appendTo('.modal-body');
    let minutes = $('#minutes').text();
    let seconds = $('#seconds').text();
    $('.modal-body').append(`<p>Solved with ${moves} moves in ${minutes}:${seconds}</p>`);
    $('#win-modal').modal();
  }
}
