let userPaddle  = document.querySelector(".userPaddle")
let aiPaddle  = document.querySelector(".aiPaddle")
let ball = document.querySelector(".ball")
let gameBox = document.getElementById("gameBox")
let aiScore = document.getElementById("aiScore")
let userScore = document.getElementById("userScore")

let xpressed = false;
let zpressed = false;
let rpressed = false;


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler) ;
document.addEventListener("reset", reset) ;

function keyUpHandler(e) {
    if(e.key == 'z'){
        zpressed = false; 
        console.log("Z press")
    }
    else if(e.key == 'x'){
        xpressed = false ;
        console.log("X press")
    }
}

function keyDownHandler(e) {
    if(e.key == 'z'){
        zpressed = true; 
        console.log("Z released")
    }
    else if(e.key == 'x'){
        xpressed = true ;
        console.log("X released")
    }
}

let Vx = 10;
let Vy = -5;
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy,2)) ;

function checkCollision(activePaddle) {
    let ballTop = ball.offsetTop ;
    let ballBottom = ball.offsetTop + ball.offsetHeight ;
    let ballRight = ball.offsetLeft + ball.offsetWidth ;
    let ballLeft = ball.offsetLeft ;

    let paddleTop = activePaddle.offsetTop ;
    let paddleBottom = activePaddle.offsetTop + activePaddle.offsetHeight ;
    let paddleRight = activePaddle.offsetLeft + activePaddle.offsetWidth ;
    let paddleLeft = activePaddle.offsetLeft ;

    if(ballBottom > paddleTop && ballTop < paddleBottom && ballRight > paddleLeft && ballLeft < paddleRight) {
        return true
    } 
    else{
        return false
    }
}

function reset(e) {
    ball.style.left = "50%" ;
    ball.style.top = "50%" ;
    Vx = 10 ;
    Vy = -5 ;
    V =  Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy,2)) ;
}

function gameloop() {

    if(ball.offsetLeft < 0){
        aiScore.innerHTML = parseInt(aiScore.innerHTML) + 1;
        reset() ;
       
    }
    if(ball.offsetLeft > gameBox.offsetWidth - ball.offsetWidth){
        userScore.innerHTML = parseInt(userScore.innerHTML) + 1;
        reset();
    }
    if(ball.offsetTop < 0) {
        Vy = -Vy
    }
    if(ball.offsetTop > gameBox.offsetHeight - ball.offsetHeight){
        Vy = -Vy
    }

    let paddle = ball.offsetLeft < gameBox.offsetWidth/2 ? userPaddle : aiPaddle ;
    let ballCenterY = ball.offsetTop + ball.offsetHeight/2 ;
    let paddleCenterY = paddle.offsetTop + paddle.offsetHeight/2 ;

    let angle = 0 ;

    if(checkCollision(paddle)){
        //Collision Detection
        if(paddle == userPaddle){
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
        else if(paddle == aiPaddle){
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
        V = V + 0.1
        Vx = V * Math.cos(angle)
        Vy = V * Math.sin(angle)
    }

    let aiDelay = 0.2;
    aiPaddle.style.top = aiPaddle.offsetTop + (ball.offsetTop - aiPaddle.offsetTop - aiPaddle.offsetHeight/2) * aiDelay + "px" ;

    ball.style.left = ball.offsetLeft + Vx + "px" ;
    ball.style.top = ball.offsetTop + Vy + "px" ;

    if(zpressed && userPaddle.offsetTop > 55){
        userPaddle.style.top = userPaddle.offsetTop - 10 + "px"
    }
    if(xpressed && userPaddle.offsetTop <gameBox.offsetHeight - userPaddle.offsetHeight + 30){
        userPaddle.style.top = userPaddle.offsetTop + 10 + "px"
    }

    requestAnimationFrame(gameloop);
}

gameloop(); 