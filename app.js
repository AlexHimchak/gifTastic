      var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King", "Teenage Mutant Ninja Turtles", "Pulp Fiction"];


      function displayMovieInfo() {
          var movie = $(this).attr("data-name");
          $("#movies-view").empty();
          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
              movie + "&api_key=dc6zaTOxFJmzC&limit=10";

          $.ajax({
              url: queryURL,
              method: "GET"
          }).done(function(response) {
              var results = response.data;
              for (var i = 0; i < results.length; i++) {
                  var gifDiv = $("<div class='item'>");
                  var rating = results[i].rating;
                  var p = $("<p>").text("Rating: " + rating);
                  var animated = results[i].images.fixed_height.url;
                  var still = results[i].images.fixed_height_still.url;
                  var personImage = $("<img>");

                  personImage.attr("src", still);
                  personImage.attr("data-still", still);
                  personImage.attr("data-animate", animated);
                  personImage.attr("data-state", "still");
                  personImage.addClass("personImage");

                  gifDiv.prepend(p);
                  gifDiv.prepend(personImage);

                  $("#movies-view").prepend(gifDiv);
              }

          });
      }

      function renderButtons() {

          $("#buttons-view").empty();

          for (var i = 0; i < movies.length; i++) {

              var a = $("<button>");

              a.addClass("movie");

              a.attr("data-name", movies[i]);

              a.text(movies[i]);

              $("#buttons-view").append(a);
          }
      }

      $("#add-movie").on("click", function(event) {
          event.preventDefault();

          var movie = $("#movie-input").val().trim();

          movies.push(movie);

          renderButtons();
      });

      $(document).on("click", ".movie", displayMovieInfo);

      renderButtons();
      $(document).on("click", ".personImage", function() {
         var state = $(this).attr("data-state");
          console.log(state);
          console.log(this);

          if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
          } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
          }
      });
