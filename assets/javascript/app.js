// GIPHY API key: zw1vDrg6mOwSyq57NtJLipsWNbp0vpGG

//I need a function that will generate buttons from an array.
buttonGenerate = item => {
    // first I need to select the button element in jquery
    button = $("<button>");
    // Inside the loop an attr of data-* will need to be made so that each button can be distinguished from the other
    button.attr("data-sport", item).text(item);
    // The button then needs to appear in the #button-area div
    $("#button-area").append(button);
}

//Array containing names for the buttons.
let buttonArray = ["Basketball", "Baseball", "Football"];

buttonArray.forEach(buttonGenerate);

// Test for buttons
$("button").on("click", function () {
    console.log(this);
    // create a variable for the sport selected using data-sport
    let sport = $(this).attr("data-sport");
    console.log(sport);
    // create the queryURL using sport selected
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${sport}&api_key=zw1vDrg6mOwSyq57NtJLipsWNbp0vpGG&limit=10`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            //create variable for the response.data
            let results = response.data;

            // I need to grab information from the different arrays, I'll use forEach again
            results.forEach(array => {
                // I need to create a div for each GIF, I'll call it sportCard
                let sportCard = $("<div>");
                // Inside the array I need to grab a title, rating and the gif itself
                // Get the title
                let title = array.title;
                // create a new paragraph with the title as the text
                title = $("<p>").text(title);
                // Get the rating
                let rating = array.rating;
                // create a new paragraph with the rating as the text
                rating = $("<p>").text(`Rating: ${rating}`);
                // add the title to a new paragraph and append to sportCard
                sportCard.append(title);
                // add the rating to a new paragraph and append to sportCard
                sportCard.append(rating);
                // get the image link
                let gifURL = array.images.fixed_height.url;
                console.log(gifURL);                
                // prepend sportCard to the #gif-area
                $("#gif-area").prepend(sportCard);
            })
        })
})