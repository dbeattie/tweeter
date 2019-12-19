$(document).ready(function() {
  $(".new-tweet textarea").on('keydown', function() {
    const remainingChar = 140 - $(this).val().length;
    const charCounter = $(this).closest(".new-tweet").find(".counter");
    if (remainingChar < 0) {
      charCounter.addClass("char-limit");
    } else {
      charCounter.removeClass("char-limit");
    }
    charCounter.text(remainingChar);
  });
});