
//game logic
var btnColors = ['green', 'red', 'gold', 'blue']

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

//keypress to start game



$(document).keypress(function() {
    if (!started) {
        nextLevel();
        started = true;
    }
});


//button press

$('button').on('click', function () {

    //game will not start if user has not pressed the keyboard button
    
    if (gamePattern.length === 0) {
        $('h1').text('First Press any Keyboard Key to Start The Game');
    }
    else {
        var userChoosenColor = this.id;

        btnSound(userChoosenColor);
        btnPress(userChoosenColor);
    
        console.log(userChoosenColor);
        userPattern.push(userChoosenColor);
        userChoosenColor = '';
            
        checkAnswer(userPattern.length-1);
    
    }
   

});

//check answer

function checkAnswer(currentLevel) {

    if (userPattern[currentLevel] == gamePattern[currentLevel]) {
        if(userPattern.length == gamePattern.length) {
            nextLevel();
            console.log('win');
        }
    }
    else {
        console.log('fail');
        $('h1').text('Wrong Answer Press any Key to Start Again');
        $('body').addClass('fail');
        setTimeout(function () {
            $('body').removeClass('fail');
        },200);
        startOver();
        btnSound('wrong');
    }
    
}



// Next level 
function nextLevel() {
    userPattern = [];
    level++;
    $('h1').text('Level ' + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = btnColors[randomNumber];
    gamePattern.push(randomColor);
    console.log(gamePattern);

    setTimeout(function () {
    $("#" + randomColor).fadeIn(300).fadeOut(200).fadeIn(200);
    },500);


}


//Sound Effects
function btnSound (userChoosenColor) {
    var audio = new Audio('sounds/' + userChoosenColor + '.mp3');
    audio.play();
}


// Animation Effects
function btnPress(userChoosenColor){

    $('#' + userChoosenColor).addClass('pressed');

    setTimeout(function () {
        $('#' + userChoosenColor).removeClass('pressed');
    }, 120);

}

function startOver(){
    level = 0;
    gamePattern = [];
    userPattern = [];
    started = false;
}
