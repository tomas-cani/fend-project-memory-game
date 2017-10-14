/*
 * Create a list that holds all of your cards
 */
const CARD_TYPES = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
  'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
cards = CARD_TYPES.concat(CARD_TYPES);

let moves;
let remainingMatches;
let openCards;
let timeStart;
let timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function initDeck(cards) {
  $('.deck').empty();
  const shuffledCards = shuffle(cards);
  const shuffledCardsTemplates = shuffledCards.map((card) => {
    return `<li class="card"><i class="fa ${card}"></i></li>`;
  });
  $('.deck').append(shuffledCardsTemplates);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function startTimer() {
  // from https://stackoverflow.com/a/7910506/5384592
  var sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; };
  timer = setInterval( function(){
    $("#seconds").html(pad(++sec % 60));
    $("#minutes").html(pad(parseInt(sec / 60, 10)));
  }, 1000);
}

function initGame() {
  moves = 0;
  setMoves(moves);
  resetStarRating();
  resetTimer();
  remainingMatches = CARD_TYPES.length;
  openCards = [];

  initDeck(cards);
  $('.card').click(handleCardClick);
}

initGame();
