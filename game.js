var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userPattern = [];
var gameState = false;
var level = 0;

function newSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randNumber = Math.floor((Math.random() * 4));
    var randChooseColour = buttonColours[randNumber];
    gamePattern.push(randChooseColour);
    $("#" + randChooseColour).fadeOut(100).fadeIn(100);
    playSound(randChooseColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userPattern[currentLevel]) {
        console.log('success');
        if (gamePattern.length == userPattern.length) {
            setTimeout(function () {
                newSequence();
            }, 800);
        }
    } else {
        $('body').addClass('game-over');
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#level-title").css('fontSize','2rem');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
    }

}

function startOver() {
    level = 0;
    gameState = false;
    gamePattern = [];
}


$('.btn').click(function () {
    var userChoosenColour = $(this).attr("id");
    userPattern.push(userChoosenColour);
    if (gameState) {
        playSound(userChoosenColour);
    }
    animatePress(userChoosenColour);
    checkAnswer(userPattern.length - 1);
})

$(document).on('keypress', function () {
    if (!gameState) {
        $('#level-title').text("Level " + level);
        newSequence();
        gameState = true;
    }
});