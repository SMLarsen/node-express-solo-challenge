console.log('js loaded');

$(document).ready(function() {
    console.log("document ready");

    $('#getButton').on('click', function() {
      console.log('get button clicked');
      getJokes();
    });

    function putJoke() {
      $.ajax({
          type: 'POST',
          url: '/joke',
          data: compRequest,
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
            // console.log(data);
            console.log("Success - GET");
          },
          error: function(){
            console.log("Error - GET");
          }
      });
    } // end getJokes


});  // end document ready
