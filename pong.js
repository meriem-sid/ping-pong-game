//start the game
function hideInstructions(){
document.querySelector(".start-screen").style.display="none";
gameStarted = true;
ballStartDelay = ballStartDelayTime; 
resetPaddles();
// Ensure ball is centered when game starts
computeBoundsAndCenter();
centerBall();
}

//paddles-movements
const paddleRight = document.querySelector(".paddle-right");
const paddleLeft = document.querySelector(".paddle-left");
const gameContainer = document.querySelector('.game-container');
const court = document.querySelector('.court');
const ball = document.querySelector('.ball');

let paddlePositionR = 0;
let paddlePositionL = 0;
const movespeed = 5;

//Ball physics variables
let ballX = 0;
let ballY = 0;
let ballVelocityX = 0;
let ballVelocityY = 0;
let ballSize = 20;
let courtWidth = 0;
let courtHeight = 0;


let paddleWidth = 15;
let paddleHeight = 100;
let leftPaddleX = 30;
let rightPaddleX = 0;


let rallyCount = 0;
const hitsPerSpeedIncrease = 4; //INCREASE SPEED VERY 4 HITS

//game settings
const baseSpeed = 2.5;
const speedIncrement = 0.25; 
const maxSpeed = 8; 


let gameStarted = false;
let ballStartDelay = 0;
const ballStartDelayTime = 180; // 3 seconds at 60fps

let minY = 0;
let maxY = 0;

function computeBoundsAndCenter() {
	// Get the actual playable area dimensions
	const gameRect = gameContainer.getBoundingClientRect();
	courtWidth = gameRect.width;
	courtHeight = gameRect.height;
	
	const paddleRect = paddleLeft.getBoundingClientRect();

	const margin = 8; 
	minY = margin;
	maxY = courtHeight - paddleRect.height - margin;

	const center = Math.round((courtHeight - paddleRect.height) / 2);
	paddlePositionL = center;
	paddlePositionR = center;

	paddleLeft.style.top = paddlePositionL + 'px';
	paddleRight.style.top = paddlePositionR + 'px';
	
	//Update paddle positions
	rightPaddleX = courtWidth - 30 - paddleWidth;
	
	
	centerBall();
	
	// initialize ball
	if (ballVelocityX === 0 && ballVelocityY === 0 && ballStartDelay === 0) {
		resetBall(true);
	}

}

window.addEventListener('load', () => {
	computeBoundsAndCenter();
	// Ensure ball is centered after everything loads
	setTimeout(() => {
		centerBall();
	}, 100);
});
window.addEventListener('resize', computeBoundsAndCenter);

function centerBall() {
	if (courtWidth <= 0 || courtHeight <= 0) {
		const gameRect = gameContainer.getBoundingClientRect();
		courtWidth = gameRect.width;
		courtHeight = gameRect.height;
	}
	
	ballX = Math.round(courtWidth / 2);
	ballY = Math.round(courtHeight / 2);
	
	ball.style.left = Math.round(ballX - (ballSize / 2)) + 'px';
	ball.style.top = Math.round(ballY - (ballSize / 2)) + 'px';
	ball.style.transform = 'none';
	ball.style.position = 'absolute';
}

const keys={};

document.addEventListener("keydown", (e) => {
	const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
	keys[key] = true;
});
document.addEventListener("keyup", (e) => {
	const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
	keys[key] = false;
});

function playerControl(){
	// left paddle: 'w' = up, 's' = down
	if(keys['w']){
		paddlePositionL -= movespeed;
	}
	if(keys['s']){
		paddlePositionL += movespeed;
	}

	// right paddle: ArrowUp = up, ArrowDown = down
	if(keys['ArrowUp']){
		paddlePositionR -= movespeed;
	}
	if(keys['ArrowDown']){
		paddlePositionR += movespeed;
	}

	// clamp to computed bounds
	paddlePositionL = Math.max(minY, Math.min(maxY, paddlePositionL));
	paddlePositionR = Math.max(minY, Math.min(maxY, paddlePositionR));

	// apply positions
	paddleLeft.style.top = paddlePositionL + "px";
	paddleRight.style.top = paddlePositionR + "px";
}

function resetBall(isInitial = false) {
	centerBall();
	
	if (isInitial) {
		
		ballVelocityX = 0;
		ballVelocityY = 0;
		ballStartDelay = ballStartDelayTime;
		rallyCount = 0; //reset rally count
	} else {
		//ball movement after starting
		ballVelocityX = Math.random() < 0.5 ? -baseSpeed : baseSpeed;
		ballVelocityY = (Math.random() - 0.5) * 3;
		ballStartDelay = ballStartDelayTime;
		rallyCount = 0;
	}
}


function resetPaddles() {
	//reset paddles to center
	const center = Math.round((courtHeight - paddleHeight) / 2);
	paddlePositionL = center;
	paddlePositionR = center;
	
	
	paddleLeft.style.top = paddlePositionL + 'px';
	paddleRight.style.top = paddlePositionR + 'px';
	

	ballX = courtWidth / 2;
	ballY = courtHeight / 2;
	ball.style.left = (ballX - ballSize/2) + 'px';
	ball.style.top = (ballY - ballSize/2) + 'px';
	ball.style.transform = 'none';
}

function updateBall() {
	
	if (ballStartDelay > 0) {
		ballStartDelay--;
		if (ballStartDelay === 0 && gameStarted) {
			ballVelocityX = Math.random() < 0.5 ? -baseSpeed : baseSpeed;
			ballVelocityY = (Math.random() - 0.5) * 3;
		}
		
		centerBall();
		return;
	}
	
	// Update ball position
	ballX += ballVelocityX;
	ballY += ballVelocityY;
	
	
	const ballRadius = ballSize / 2;
	
	//top wall collision
	if (ballY - ballRadius <= 0) {
		ballY = ballRadius;
		ballVelocityY = -ballVelocityY;
	}
	
	//bottom wall collision
	if (ballY + ballRadius >= courtHeight) {
		ballY = courtHeight - ballRadius;
		ballVelocityY = -ballVelocityY;
	}
	
	//right player scored
	if (ballX < 0) {
		
		resetPaddles(); 
		resetBall(false); 
		return;
	}
	// left player scored
	if (ballX > courtWidth) {
		resetPaddles(); 
		resetBall(false); 
		return;
	}
	

	// left paddle collision
	if (ballX - ballRadius <= leftPaddleX + paddleWidth && 
		ballX - ballRadius >= leftPaddleX &&
		ballY >= paddlePositionL && 
		ballY <= paddlePositionL + paddleHeight &&
		ballVelocityX < 0) {
		ballX = leftPaddleX + paddleWidth + ballRadius;//This moves the ball just outside the paddle so it doesn't remain overlapping and cause multiple collisions
		
		//Angle variation based on where ball hits paddle
		const hitPos = (ballY - paddlePositionL) / paddleHeight - 0.5;
		ballVelocityY = hitPos * 5; 
		rallyCount++;
		const speedBonus = Math.floor(rallyCount / hitsPerSpeedIncrease) * speedIncrement;
		const newSpeed = Math.min(maxSpeed, baseSpeed + speedBonus);
		ballVelocityX = newSpeed;
	}
	
	//right paddle collision
	if (ballX + ballRadius >= rightPaddleX && 
		ballX + ballRadius <= rightPaddleX + paddleWidth &&
		ballY >= paddlePositionR && 
		ballY <= paddlePositionR + paddleHeight &&
		ballVelocityX > 0) {
		ballX = rightPaddleX - ballRadius;
		
		//Angle variation based on where ball hits paddle
		const hitPos = (ballY - paddlePositionR) / paddleHeight - 0.5;
		ballVelocityY = hitPos * 5;
		rallyCount++;
		const speedBonus = Math.floor(rallyCount / hitsPerSpeedIncrease) * speedIncrement;
		const newSpeed = Math.min(maxSpeed, baseSpeed + speedBonus);
		ballVelocityX = -newSpeed;
	}
	
	
	
	ball.style.left = (ballX - ballSize/2) + 'px';
	ball.style.top = (ballY - ballSize/2) + 'px';
	ball.style.transform = 'none';
}

function gameLoop() {
	playerControl();
	updateBall();
	requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);




