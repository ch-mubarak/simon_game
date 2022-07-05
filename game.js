var gamePattern=[];
var buttonColor=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var isStarted=false;


$(document).on("keydown",function(){
    
    if (isStarted===false){
        nextSequence();
        isStarted=true;
    }
})


function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level)
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

}


$(".btn").click(function(){

    var userChosenColor=this.id;
    animatePress(userChosenColor)
    
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    
})

function playSound(name){

    var audio= new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 80);

}

function checkAnswer(currentLevel){
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log ("success");



        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{

        var wrongAudio=new Audio("sounds/wrong.mp3")
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game over, press any key to Restart");
        $(document).on("keydown",function(){
            startOver();
        });

    }
}



function startOver(){
    isStarted=false;
    level=0;
    gamePattern=[];


}



