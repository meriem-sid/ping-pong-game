const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;

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


function gameUpdate() {
    ball.Update();
    ballColision(ball)
}

function gameDraw () {    
    ball.Draw();
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
