// GIPHY API key: zw1vDrg6mOwSyq57NtJLipsWNbp0vpGG

//I need a function that will generate buttons from an array.
buttonGenerate = item => {
    // first I need to select the button element in jquery
    button = $("<button>");
    // Inside the loop an attr of data-* will need to be made so that each button can be distinguished from the other
    button.addClass("sport").attr("data-sport", item).text(item);
    // The button then needs to appear in the #button-area div
    $("#button-area").append(button);
}

//Array containing names for the buttons.
let buttonArray = ["Basketball", "Baseball", "Football"];

buttonArray.forEach(buttonGenerate);

// Buttons to generate gifs for the sport
$(document).on("click", ".sport", function () {
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

            // clear the div
            $("#gif-area").empty();

            //create variable for the response.data
            let results = response.data;

            // I need to grab information from the different arrays, I'll use forEach again
            results.forEach(array => {
                // I need to create a div for each GIF, I'll call it sportCard
                let sportCard = $("<div>").addClass("card");
                // Inside the array I need to grab a title, rating and the gif itself
                // Get the title
                let title = array.title;
                // create a new paragraph with the title as the text
                title = $("<p>").text(title).addClass("gif-title");
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
                // create gif image that will be displayed
                let gif = $("<img>").attr("src", gifURL);
                // append to sportCard
                sportCard.append(gif);                
                // prepend sportCard to the #gif-area
                $("#gif-area").prepend(sportCard);
            })
        })
})

// Add a sport to the button list
$("#add-sport").on("click", function(event) {
    // stop the page from reloading
    event.preventDefault();

    // get the new sport from #sport-input
    let newSport = $("#sport-input").val().trim();
    console.log(newSport);

    // push the newSport into the buttonArray
    buttonArray.push(newSport);
    console.log(buttonArray);

    // clear the button area
    $("#button-area").empty();

    $("#sport-input").val("");

    // regenerate the buttons using the new array
    buttonArray.forEach(buttonGenerate);
})