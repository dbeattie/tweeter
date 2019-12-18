/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //PREVENTS XSS ATTACKS WHEN WRAPPED AROUND USER INPUTTED TEXT
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
    <p>${escape(tweet.content.text)}</p>
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

  const loadTweets = function() {    
    console.log('Performing ajax call...');
    $.ajax({
      url: "/tweets",
      dataType: "json",
      method: "GET",
      }).done(function(db) {
        console.log("GET SUCCESS");
        renderTweets(db);
      }).fail(function() {
        console.log("GET FAILED");
      }) 
  }

  $("#submit").submit(function(event) {  
    const wordCount = $(this).find("textarea").val().length;
    if (wordCount === 0) {
      alert("Form Cannot Be Empty");
      event.preventDefault();
    } else if (wordCount > 140) {
      alert("Form cannot exceed 140 characters");
      event.preventDefault();
    } else {
      event.preventDefault();    
      $.ajax({
        url: $(this).attr("action"),
        method: $(this).attr("method"),
        dataType: "text",
        contentType: "application/x-www-form-urlencoded",
        data: $(this).find("textarea").serialize(),
      }).done(function() {
        loadTweets();
        console.log('POST SUCCESS!');
      }).fail(function() {
        console.log('POST FAILED!');
      });
    }
  });

  loadTweets();

});   