var buttonColor = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//detect when a keyboard key has been pressed
$(document).keypress(function() {
  if (!started) {  //like if not false mean true
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
    //cat (not includ in class)
    $("#catCanvas").css("display","none");
    }
});

//create what happend when click
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id"); // this คือ div ของ button ex. green button ข้อมูลคือ id #green class .btn .green
                                                  //บรรทัดบนเลยหมายถึงให้แสดง attribute id ของ button ซึ่งก็แค่ green red blue yello
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playsound(userChosenColor);
    animatePress(userChosenColor)

    //เรียก check ans หลังจาก user click คำตอบ
    checkAnswer(userClickedPattern.length-1);

});

// check ans and create if else for correct and wrong ans
function checkAnswer(currentLevel) { //เช็คว่าคำตอบตรงกันไหม

    //check คือถ้าเกิดตรงกันขึ้น success ไม่ตรง ขึ้น wrong
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
 
       console.log("success");
 
       // ถ้าหากคำตอบตรงกับตรวจสอบเพิ่มว่าลำดับตรงกันไหม
       if (userClickedPattern.length === gamePattern.length){
 
         //5. Call nextSequence() after a 1000 millisecond delay.
         setTimeout(function () {
           nextSequence();
         }, 1000);
 
       }
 
     } else {
        // cat (not includ in class)
        $("#catCanvas").css("display","inline");
        //
       console.log("wrong");
        $("body").addClass("game-over")
       setTimeout(function () {$("body").removeClass("game-over");}, 200);
        
       $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        playsound("wrong");

        
    }
     
 
 }

//ramdom color and make sound
function nextSequence()  { 
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    //random เป็นตัวเลข เพื่อใช้เป็นตำแหน่งในarray buttonColor
    var randomNumber = Math.floor((Math.random())*4); // 0-3
    var randomChosenColor = buttonColor[randomNumber]; //color
    gamePattern.push(randomChosenColor); // gamePattern = [...+...+...+...];
    //(copy from google)serch google how to make flash
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
    
}   

// play sound when game show or user click
    function playsound(name) { 
        var audio = new Audio("sounds/" + name +".mp3");
        audio.play();
    }

//create effect when press at color button
function animatePress(currentColor) { 
    $("#" + currentColor).addClass("pressed");
    //serch from google how to use javascript remove the pressed class after sec
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;

    
    
}















/////////////////////////ไม่เกี่ยวกับเนื้อหา/////////////////////////////

// Uses the following sprite sheet
// https://i.imgur.com/eBRbpuh.png

// Looking for a new gig?
// http://join.hired.com/x/GQ96gt
// <3

stage = new createjs.Stage("catCanvas");
stage.globalCompositeOperation='destination-over';

var spriteSheet = new createjs.SpriteSheet({
  framerate: 20,
  "images": ["https://78.media.tumblr.com/5fd3052563766c3377307ab1a37b768a/tumblr_oxj1xe5Bna1qz4vfso2_1280.png"],
  frames: {width:420, height:285, "count": 7},
  animations: {
    "fly": [0, 1, 2, 3, 4, 5, 6]
  }
});

cat = new createjs.Sprite(spriteSheet, "fly");
cat.y = 100;
cat.x = 300;

stage.addChild(cat);
stage.update();

createjs.Ticker.on("tick", handleTick);
function handleTick(event) {
  stage.update(event);
}

function tick(event) {
  stage.update();
};