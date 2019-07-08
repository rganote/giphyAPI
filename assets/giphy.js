
$(document).ready(function() {


    var movies = ["The Godfather", "Pulp Fiction", "Shawshank Redemption", "Forrest Gump", "Star Wars", "Jurassic Park", "The Thing", "Raiders of The Lost Ark", "Wall-e"];


    function displayInfo() {
        var movie = $(this).attr("movie-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=Q0TM1P03q8bbxvTtwVVZD8rsWYf7nl2u&limit=6";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {


            $("#movies").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div class='usermovie'>");


                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);


                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;


                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");


                movieDiv.append(gif);
                movieDiv.append(pRate);


                $("#movies").append(movieDiv);
            }

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }


    function renderButtons() {


        $("#movieButtons").empty();

        
        for (var i = 0; i < topics.length; i++) {

            var movieRender = $("<button>");


            movieRender.addClass("movie");
            movieRender.attr("movie-name", topics[i]);
            movieRender.text(topics[i]);
            $("#movieButtons").append(movieRender);
        }
    }


    $("#addmovie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();

        topics.push(movie);
            $("#movie-input").val(" ");
        renderButtons();
    });


    $(document).on("click", ".movie", displayInfo);

    renderButtons();

});
