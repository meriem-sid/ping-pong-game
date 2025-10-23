const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;


//KeyBoard Input .

const keyPressed = [];
const KeyDown = 40;
const KeyUp = 38;

window.addEventListener('keydown' , function(e){
    keyPressed[e.keyCode] = true;
})

window.addEventListener('keyup' , function(e){
    keyPressed[e.keyCode] = false;
})

// physics
function vec2(x,y){
    return{x: x ,y: y};
}


function ballColision(ball){
    if (ball.pos.x > canvas.width - ball.radius || ball.pos.x < ball.radius) {
        ball.Velocity.x *= -1;
    }
    if (ball.pos.y > canvas.height - ball.radius || ball.pos.y < ball.radius) {
        ball.Velocity.y *= -1;
    }
}


function PaddleCollsionWithTheEdges(paddle){
    if(paddle.pos.y<=0){
        paddle.pos.y=0;
    }
    if(paddle.pos.y + paddle.height>= canvas.height){
        paddle.pos.y = canvas.height-paddle.height;
    }
}


function Paddle(pos, Velocity, width, height){
    this.pos = pos;
    this.Velocity = Velocity;
    this.width = width;
    this.height = height;


    this.Update = function(){
        if(keyPressed[KeyUp]){
            this.pos.y-= this.Velocity.y;;
        }
        if(keyPressed[KeyDown]){
            this.pos.y +=this.Velocity.y;;
        }
    }

    this.Draw = function(){
        ctx.fillStyle = '#33ff00'
        ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height);
    }

}

function Ball(pos, Velocity, radius){
    this.pos = pos;
    this.Velocity = Velocity;
    this.radius = radius;
    
    this.Update = function(){
        this.pos.x += this.Velocity.x;
        this.pos.y += this.Velocity.y;
    };

    this.Draw = function(){

        ctx.fillStyle = "#33ff00";
        ctx.strokeStyle = "#33ff00";
        
        ctx.beginPath();
    
        ctx.arc(
            this.pos.x,
            this.pos.y,
            this.radius,
            0,
            Math.PI* 2
        );
        
        ctx.fill();
        ctx.stroke();        
    };
}


const ball = new Ball(vec2(200,200),vec2(2,2),20);

const paddle1 = new Paddle(vec2(0,50), vec2(5,5) , 20, 160);
const paddle2 = new Paddle(vec2(canvas.width-20,50), vec2(5,5) , 20, 160);

function gameUpdate() {
    ball.Update();
    paddle1.Update();
    paddle2.Update();
    PaddleCollsionWithTheEdges(paddle1);
    PaddleCollsionWithTheEdges(paddle2);
    ballColision(ball)
}

function gameDraw () {    
    ball.Draw();
    paddle1.Draw();
    paddle2.Draw();
}

function gameLoop () {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    
    gameUpdate();
    gameDraw();
    
    window.requestAnimationFrame(gameLoop);
}


gameLoop();
