
//game logic
const btnColors = ['green', 'red', 'gold', 'blue']

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;
 
var score = [];

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//keypress to start game

if (isMobile) { 
    $('h1').click(function(){
        if (!started) {
            $('h2').text('');
            nextLevel();
            started = true;
        }
    });
 }
 else {
    $(document).keypress(function() {
        if (!started) {
            $('h2').text('');
            nextLevel();
            started = true;
        }
    });
 }







//Button press

$('.box').on('click', function () {

    //game will not start if user has not pressed the keyboard key
    
    if (gamePattern.length === 0) {
        $('h1').text('Oops');
        $('h2').text('First Press any Keyboard Key to Start The Game');
        startOver();
        btnSound('wrong');
    }
    else {
        var userChoosenColor = this.id;

        btnSound(userChoosenColor);
        btnPress(userChoosenColor);
    
        userPattern.push(userChoosenColor);

        checkAnswer(userPattern.length-1);
    
    }
   

});

//check answer

function checkAnswer(currentLevel) {

    if (userPattern[currentLevel] == gamePattern[currentLevel]) {
        if(userPattern.length == gamePattern.length) {
            nextLevel();
        }
    }
    else {
        startOver();
        $('h1').text('Wrong Answer');
        var maxScore = Math.max(...score) + 1;
        $('h2').html('Press any Key to Start Game <br>Max Score ' + maxScore);
        
        btnSound('wrong');

    }
    
}



// Next level 
function nextLevel() {

    score.push(level);
    userPattern = [];
    level++;
    $('h1').text('Level ' + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = btnColors[randomNumber];
    gamePattern.push(randomColor);


    setTimeout(function () {
    $("#" + randomColor).fadeIn(300).fadeOut(200).fadeIn(200);
    btnSound(randomColor)
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
    

    $('body').addClass('fail');
    setTimeout(function () {
        $('body').removeClass('fail');
    },200);
}
