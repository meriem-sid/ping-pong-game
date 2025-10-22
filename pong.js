//start-the-game
function hideInstructions(){
document.querySelector(".start-screen").style.display="none";
}


//paddles-movements

const paddleRight=document.querySelector(".paddle-right");
const paddleLeft=document.querySelector(".paddle-left");
let paddlePositionR=200;
let paddlePositionL=200;
const movespeed=5;


const keys={};
document.addEventListener("keydown",(e)=>{keys[e.key]=true});
document.addEventListener("keyup", (e)=>{keys[e.key]=false});

function playerControl(){
if(keys["w"] && paddlePositionL<390){paddlePositionL+=movespeed;}
if(keys["s"] && paddlePositionL>10){paddlePositionL-=movespeed;}
if(keys["ArrowUp"] && paddlePositionR>10){paddlePositionR-=movespeed;}
if(keys["ArrowDown"] && paddlePositionR<390){paddlePositionR+=movespeed;}


paddleLeft.style.top= paddlePositionL + "px";
paddleRight.style.top= paddlePositionR + "px";
}
setInterval(playerControl,16);





    

;



