//start-the-game
function hideInstructions(){
document.querySelector(".start-screen").style.display="none";
}


//paddles-movements

const paddleRight = document.querySelector(".paddle-right");
const paddleLeft = document.querySelector(".paddle-left");
const gameContainer = document.querySelector('.game-container');
const court = document.querySelector('.court');

let paddlePositionR = 0;
let paddlePositionL = 0;
const movespeed = 5;

let minY = 0;
let maxY = 0;

function computeBoundsAndCenter() {
	const containerRect = court.getBoundingClientRect();
	const paddleRect = paddleLeft.getBoundingClientRect();

	const margin = 8; 
	minY = margin;
	maxY = containerRect.height - paddleRect.height - margin;

	const center = Math.round((containerRect.height - paddleRect.height) / 2);
	paddlePositionL = center;
	paddlePositionR = center;

	paddleLeft.style.top = paddlePositionL + 'px';
	paddleRight.style.top = paddlePositionR + 'px';
}

window.addEventListener('load', computeBoundsAndCenter);
window.addEventListener('resize', computeBoundsAndCenter);


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
setInterval(playerControl,16);




