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