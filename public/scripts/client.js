/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  

  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    const millisecondsToDays = 60 * 60 * 24 * 1000;
    const daysAgo = function() {
      return Math.floor(((new Date().getTime()) - tweet.created_at)/millisecondsToDays);
    }
    const html = `
    <header>
      <img src="${tweet.user.avatars}">         
      <p>
        ${tweet.user.name}
        <span>${tweet.user.handle}</span>
      </p>                     
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <p>${daysAgo(tweet)} days ago
        <span>                
          <i class="fa fa-flag">&#160</i>
          <i class="fa fa-retweet">&#160</i>
          <i class="fa fa-heart"></i>
        </span>
      </p>                            
    </footer>`;
    $tweet.append(html);
    return $tweet;
  }

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      $('#tweet-container').prepend(createTweetElement(tweet));
    })  
  };
  
  renderTweets(data)

  $("#submit").submit(function(event) {
    event.preventDefault();    
    console.log('Submit pressed, performing ajax call...');
    console.log($(this).find("textarea").serialize());
      $.ajax({
        url: $(this).attr("action"),
        method: $(this).attr("method"),
        datatype: "text",
        data: $(this).find("textarea").serialize(),
      }).done(function(data) {
        console.log('SUCCESS: ', data);
      }).fail(function(data) {
        console.log('FAILED', data);
    });
  });
});   