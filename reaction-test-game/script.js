// Variables for measuring time, score and errors
var createdTime;
var pressTime;
var reactionTime;
var totalReactionTime = 0;
var reactionCount = 0;
var score = 0;
var errorCount = 0;

// Mapping of colors to keys
var colorKeyMap = {
    'red': 'a',
    'blue': 'd',
    'yellow': 'w',
    'green': 's',
};

// Get random color for game element
function getRandomColor() {
    const colors = ['red', 'blue', 'yellow', 'green'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Create game element
function makeFig() {
    // Set timeout before the game element appears on screen
    setTimeout(function () {
        // Set the element as a circle
        document.getElementById("fig").style.borderRadius = "50%";

        // Get random position
        document.getElementById("fig").style.top = (Math.random() * 300) + "px";
        document.getElementById("fig").style.left = (Math.random() * 500) + "px";

        // Get random color
        var randomColor = getRandomColor();
        document.getElementById("fig").style.backgroundColor = randomColor;

        // Store the current color in a data attribute for later reference
        document.getElementById("fig").setAttribute("data-color", randomColor);

        // Make element visible
        document.getElementById("fig").style.display = "block";

        // Get creation time
        createdTime = Date.now();
    }, Math.random() * 2000);
}

function startGame() {
    // Hide the "Click to start the game" button
    document.getElementById("start").style.display = "none";

    // Hide the instructions
    document.getElementById("instructions").style.display = "none";

    // Create the game element
    makeFig();

    // Make the result visible
    document.getElementById("reaction").style.display = "block";
    // document.getElementById("Average").style.display = "block";
}

function checkSelection(selectedKey) {
    // Get time when element was press
    pressTime = Date.now();

    // Get the color of the element
    var elementColor = document.getElementById("fig").getAttribute("data-color");

    // Make element invisible
    document.getElementById("fig").style.display = "none";

    // Check if the selected key matches the color of the element
    if (colorKeyMap[elementColor] === selectedKey) {
        // Correct selection
        reactionTime = (pressTime - createdTime) / 1000;
        document.getElementById("time").innerHTML = reactionTime + "s";

        // Increment the score and update the score display
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;

        // Update total reaction time and reaction count
        totalReactionTime += reactionTime;
        reactionCount++;

        // Calculate and update the average reaction time
        var averageReactionTime = totalReactionTime / reactionCount;
        document.getElementById("average").innerHTML = "Average: " + averageReactionTime.toFixed(2) + "s";
    } else {
        // Incorrect selection
        document.getElementById("time").innerHTML = "Incorrect, Try Again!";

        // Increment the error count and update the error display
        errorCount++;
        document.getElementById("errors").innerHTML = "Errors: " + errorCount;
    }
}

//click to start game
document.getElementById("start").onclick = startGame;

// Start the game when any key is pressed or when the "Click to start the game" button is press
document.addEventListener("keydown", function (event) {
    if (event.key === "a" || event.key === "w" || event.key === "d" || event.key === "s") {
        checkSelection(event.key);
    }
    startGame();
});

function resetGame (){
    //reset game
    window.location.reload();
}