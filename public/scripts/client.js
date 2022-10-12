/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(() => {
  const $tweetsContainer = $("#tweets-container");

  const renderTweets = function (tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const result = createTweetElement(tweet);
      $tweetsContainer.append(result);
    }
  };

  const createTweetElement = function (tweetObj) {
    // return the whole article element;

    const userName = tweetObj.user.name;
    const avatars = tweetObj.user.avatars;
    const nickname = tweetObj.user.handle;
    const tweetText = tweetObj.content.text;
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
      <span>${createdTime}</span>
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
  $form.on("submit", (event) => {
    event.preventDefault();
    // Form Data into a query string.
    const serializedForm = $form.serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializedForm, //be sent to the server in the data field of the AJAX POST request.
    })
      .then((response) => {
        renderTweets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
