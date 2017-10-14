let starRating = 3;

function setMoves(moves) {
  $('.moves').text(moves);
}

/**
 * Updates the rating depending on # of moves and time spent
 */
function checkStarRating(moves) {
  const minutes = Number($("#minutes").text());
  if (starRating == 3 && (moves > CARD_TYPES.length * 2 || minutes >= 1 )) {
    starRating = 2;
    $($('.stars i')[2]).removeClass('fa-star');
  } else if (starRating == 2 && (moves > CARD_TYPES.length * 3 || minutes >= 2 )) {
    starRating = 1;
    $($('.stars i')[1]).removeClass('fa-star');
  }
}

function resetStarRating() {
  starRating = 3;
  $('.stars i').each(function() {
    if (!$(this).hasClass('fa-star')) {
      $(this).addClass('fa-star');
    }
  });
}

function resetTimer() {
  clearInterval(timer);
  $("#seconds").html('00');
  $("#minutes").html('00');
}
