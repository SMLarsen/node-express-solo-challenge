console.log('js loaded');

$(document).ready(function() {
    console.log("document ready");

    getJokes();

    $('#addButton').on('click', function() {
      console.log('add button clicked');
      addJoke();

    });

    function addJoke() {
      var joke = {
        whoseJoke: $('#whoseJoke').val(),
        jokeQuestion: $('#jokeQuestion').val(),
        punchLine: $('#punchLine').val()
      };
      console.log(joke);
      putJoke(joke);
      $('.jokes').empty();
      getJokes();
    } // end addJoke

    function putJoke(joke) {
      $.ajax({
          type: 'POST',
          url: '/joke',
          data: joke,
          success: function(data) {
            console.log("Success - POST");
          },
          error: function(){
            console.log("Error - POST");
          }
      });
    } // end putJoke

    function getJokes() {
      $.ajax({
          type: 'GET',
          url: '/jokes',
          success: function(data) {
            console.log(data);
            appendJokes(data);
            console.log("Success - GET");
          },
          error: function(){
            console.log("Error - GET");
          }
      });
    } // end getJokes

    function appendJokes(jokes) {
      for (var i = 0; i < jokes.length; i++) {
        var string = '<p>Q: ' + jokes[i].jokeQuestion + '</p>';
        string += '<p>A: ' + jokes[i].punchLine + '</p>';
        string += '<p>Contributed By: ' + jokes[i].whoseJoke + '</p>';
        $('.jokes').append(string);
      }
    } // end appendJokes

});  // end document ready
