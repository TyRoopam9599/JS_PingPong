let player1Paddle  = document.querySelector(".player1Paddle")
let player2Paddle  = document.querySelector(".player2Paddle")
let ball = document.querySelector(".ball")
let gameBox = document.getElementById("gameBox")
let player2Score = document.getElementById("player2Score")
let player1Score = document.getElementById("player1Score")

let xpressed = false;
let zpressed = false;

let opressed = false;
let ppressed = false;

let spressed = false;
let rpressed = false;

document.addEventListener("keydown", player1keyDownHandler);
document.addEventListener("keyup", player1keyUpHandler) ;

document.addEventListener("keydown", player2keyDownHandler);
document.addEventListener("keyup", player2keyUpHandler) ;

document.addEventListener("reset", reset) ;
document.addEventListener("keydown", start) ;

let Vx = 0;
let Vy = 0;
let V; 

function start(e){
    if(e.key == 's') {
        spressed= true ;
        Vx = 2;
        Vy = -4 ;
        V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy,2)) ;
    }
}


function reset(e) {
    ball.style.left = "50%" ;
    ball.style.top = "50%" ;
    Vx = 0;
    Vy = 0 ;
    V =  Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy,2)) ;
}

function player1keyUpHandler(e) {
    if(e.key == 'z'){
        zpressed = false; 
        console.log("Z press")
    }
    else if(e.key == 'x'){
        xpressed = false ;
        console.log("X press")
    }
}

function player1keyDownHandler(e) {
    if(e.key == 'z'){
        zpressed = true; 
        console.log("Z released")
    }
    else if(e.key == 'x'){
        xpressed = true ;
        console.log("X released")
    }
}

function player2keyUpHandler(e) {
    if(e.key == 'o'){
        opressed = false; 
        console.log("o press")
    }
    else if(e.key == 'p'){
        ppressed = false ;
        console.log("p press")
    }
}

function player2keyDownHandler(e) {
    if(e.key == 'o'){
        opressed = true; 
        console.log("o released")
    }
    else if(e.key == 'p'){
        ppressed = true ;
        console.log("p released")
    }
}

function checkCollision(activePaddle) {
    let ballTop = ball.offsetTop ;
    let ballBottom = ball.offsetTop + ball.offsetHeight ;
    let ballRight = ball.offsetLeft + ball.offsetWidth ;
    let ballLeft = ball.offsetLeft ;

    let paddleTop = activePaddle.offsetTop ;
    let paddleBottom = activePaddle.offsetTop + activePaddle.offsetHeight ;
    let paddleRight = activePaddle.offsetLeft + activePaddle.offsetWidth ;
    let paddleLeft = activePaddle.offsetLeft ;

    if(ballBottom > paddleTop && ballTop <= paddleBottom && ballRight > paddleLeft && ballLeft <= paddleRight) {
        return true
    } 
    else{
        return false
    }
}

function gameloop() {

    if(ball.offsetLeft < 0){
        player2Score.innerHTML = parseInt(player2Score.innerHTML) + 1;
        reset() ;
    }
    if(ball.offsetLeft > gameBox.offsetWidth - ball.offsetWidth){
        player1Score.innerHTML = parseInt(player1Score.innerHTML) + 1;
        reset();
    }
    if(ball.offsetTop < 0) {
        Vy = -Vy
    }
    if(ball.offsetTop > gameBox.offsetHeight - ball.offsetHeight){
        Vy = -Vy
    }

    let paddle = ball.offsetLeft < gameBox.offsetWidth/2 ? player1Paddle : player2Paddle ;
    let ballCenterY = ball.offsetTop + ball.offsetHeight/2 ;
    let paddleCenterY = paddle.offsetTop + paddle.offsetHeight/2 ;

    let angle = 0 ;

    if(checkCollision(paddle)){
        //Collision Detection
        if(paddle == player1Paddle){
            if(ballCenterY < paddleCenterY){
                angle = -Math.PI/4  
            }
            else if(ballCenterY > paddleCenterY) {
                angle = Math.PI/4
            }
            else{
                angle = 0
            }
        }
        else if(paddle == player2Paddle){
            if(ballCenterY < paddleCenterY){
                angle = -3*Math.PI/4  
            }
            else if(ballCenterY > paddleCenterY) {
                angle = 3*Math.PI/4
            }
            else{
                angle = 0
            }
        }
        V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy,2)) ;
        V = V + 0.5;
        Vx = V * Math.cos(angle)
        Vy = V * Math.sin(angle)
    }

    //let player2Delay = 0.2;
    //player2Paddle.style.top = player2Paddle.offsetTop + (ball.offsetTop - player2Paddle.offsetTop - player2Paddle.offsetHeight/2) * player2Delay + "px" ;

    ball.style.left = ball.offsetLeft + Vx + "px" ;
    ball.style.top = ball.offsetTop + Vy + "px" ;

    //Player1 Paddle
    if(zpressed && player1Paddle.offsetTop > 55){
        player1Paddle.style.top = player1Paddle.offsetTop - 10 + "px"
    }
    if(xpressed && player1Paddle.offsetTop <gameBox.offsetHeight - player1Paddle.offsetHeight + 30){
        player1Paddle.style.top = player1Paddle.offsetTop + 10 + "px"
    }
   
    //Player2 Paddle
    if(opressed && player2Paddle.offsetTop > 55) {
        player2Paddle.style.top = player2Paddle.offsetTop - 10 + "px"
    }
    if(ppressed && player2Paddle.offsetTop < gameBox.offsetHeight - player2Paddle.offsetHeight + 30){
        player2Paddle.style.top = player2Paddle.offsetTop + 10 + "px"
    }

    requestAnimationFrame(gameloop);
}

gameloop(); 