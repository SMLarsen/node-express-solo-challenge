console.log('js loaded');
var jokes = [];

$(document).ready(function() {
    console.log("document ready");

    // get and display jokes on DOM
    getJokes();

    // =====  EVENTS  ======
    // Add joke event
    $('#addButton').on('click', function() {
        addJoke();
    });

    // Answer joke event
    $('.jokes').on('click', '.answerButton', function() {
        answerJoke($(this).data('idx'));
    });


    // ===== FUNCTIONS  =======

    function addJoke() {
        var joke = {
            whoseJoke: $('#whoseJoke').val(),
            jokeQuestion: $('#jokeQuestion').val(),
            punchLine: $('#punchLine').val()
        };
        putJoke(joke);
        clearDisplay();
        getJokes();
    } // end addJoke

    // put joke on server
    function putJoke(joke) {
        $.ajax({
            type: 'POST',
            url: '/joke',
            data: joke,
            success: function(data) {
                console.log("Success - POST");
            },
            error: function() {
                console.log("Error - POST");
            }
        });
    } // end putJoke

    // get jokes from server
    function getJokes() {
        $.ajax({
            type: 'GET',
            url: '/jokes',
            success: function(data) {
                jokes = data;
                appendJokes(data);
                console.log("Success - GET");
            },
            error: function() {
                console.log("Error - GET");
            }
        });
    } // end getJokes

    // append all jokes to DOM
    function appendJokes(jokes) {
        for (var i = 0; i < jokes.length; i++) {
            var string = '<div class="joke" id="joke' + i + '">';
            string += '<p class="jokeQuestion">Q: ' + jokes[i].jokeQuestion + '</p>';
            // string += '<p class="punchLine">A: ' + jokes[i].punchLine + '</p>';
            // string += '<p class="whoseJoke">Contributed By: ' + jokes[i].whoseJoke + '</p>';
            string += '<button class="answerButton" name="answerButton" data-idx="' + i + '">Answer</button>';
            string += '</div>';
            $('.jokes').append(string);
        }
    } // end appendJokes

      // append answer of this joke to DOM
      function answerJoke(idx) {
        console.log(idx);
          var string = '<p class="punchLine">A: ' + jokes[idx].punchLine + '</p>';
          string += '<p class="whoseJoke">Contributed By: ' + jokes[idx].whoseJoke + '</p>';
          var jokeID = '#joke' + idx;
          $(jokeID).find('button').remove();
          $(jokeID).append(string);
      } // end answerJokes

    // clears entry fields and joke display
    function clearDisplay() {
        $('.jokes').empty();
        $('#whoseJoke').val('');
        $('#jokeQuestion').val('');
        $('#punchLine').val('');
    } // end of clearDisplay

}); // end document ready
