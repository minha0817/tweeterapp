/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const $error = $(".error");
  $error.hide();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $tweetsContainer = $("#tweets-container");

  const renderTweets = function (tweets) {
    // loops through tweets
    $tweetsContainer.html("");
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const result = createTweetElement(tweet);
      $tweetsContainer.prepend(result);
    }
  };

  const createTweetElement = function (tweetObj) {
    // return the whole article element;

    const userName = tweetObj.user.name;
    const avatars = tweetObj.user.avatars;
    const nickname = tweetObj.user.handle;
    const tweetText = escape(tweetObj.content.text);
    const createdTime = tweetObj.created_at;

    const $tweet = `<article class='tweets'>
    <header class='tweets-header'>
      <div>
        <img src=${avatars}></img>              
        <span>${userName}</span>
      </div>
      <span class='tweets-nickname'>${nickname}</span>
    </header>
    <p class='tweets-message'>${tweetText}</p>
    <footer class='tweets-footer'>
      <span>${timeago.format(createdTime)}</span>
      <div class='tweets-icons'>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>          
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`;

    return $tweet;
  };

  //Add an Event Listener and Prevent the Default Behaviour
  const $form = $("form");
  const $tweetText = $("#tweet-text");
  const $counter = $(".counter");
  $form.on("submit", (event) => {
    event.preventDefault();
    // Form Data into a query string.
    const serializedForm = $form.serialize();
    const textAreaValue = $tweetText.val();

    if (textAreaValue === "" || textAreaValue === null) {
      return $error.slideDown("slow");
    }

    if (textAreaValue.length > 140) {
      return $error.slideDown("slow");
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializedForm, //be sent to the server in the data field of the AJAX POST request.
    })
      .then((response) => {
        loadTweets();
        $error.slideUp();
      })
      .catch((error) => {
        console.log(error);
      });

    $counter.val(140);
    $tweetText.val("");
  });

  //fetching tweets from the webpage.
  const loadTweets = function () {
    // Ajax GET request to /tweets.
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
    })
      .then((response) => {
        // renderTweets, passing it the response from the AJAX request ???
        renderTweets(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadTweets();
});
