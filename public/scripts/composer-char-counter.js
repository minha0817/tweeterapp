//This file will be solely responsible for this character counter.
$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const $input = $(this); //#tweet-text
    const length = $input.val().length;
    const remaining = 140 - length;

    const div = $(this).parent();
    const form = div.parent();
    const output = form.find("output.counter");
    output.text(remaining);

    if (remaining < 0) {
      output.addClass("negative-remaining");
    }
  });
});

//how to search up  in jquery.
