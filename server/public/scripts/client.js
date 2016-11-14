console.log('js loaded');

$(document).ready(function() {
    console.log("document ready");

    // get and display jokes on DOM
    getJokes();

    // =====  EVENTS  ======
    // Add joke event
    $('#addButton').on('click', function() {
        addJoke();
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
            var string = '<div class="joke">';
            string += '<p class="jokeQuestion">Q: ' + jokes[i].jokeQuestion + '</p>';
            string += '<p class="punchLine">A: ' + jokes[i].punchLine + '</p>';
            string += '<p class="whoseJoke">Contributed By: ' + jokes[i].whoseJoke + '</p>';
            string += '</div>';
            $('.jokes').append(string);
        }
    } // end appendJokes

    // clears entry fields and joke display
    function clearDisplay() {
        $('.jokes').empty();
        $('#whoseJoke').val('');
        $('#jokeQuestion').val('');
        $('#punchLine').val('');
    } // end of clearDisplay

}); // end document ready
