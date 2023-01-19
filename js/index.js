let inputDir={x:0,y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let score=0;
let speed=4;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
];
food ={x:6,y:7};

//loader

function removeLevel(){
    document.getElementById("preloader").style.visibility="hidden";
}
setTimeout("removeLevel()",3000);


//function
function main(ctime){
    window.requestAnimationFrame(main);  // for game loop
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if snake collide itself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    // return false;
}
function gameEngine(){
    //1.updating snake array n food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over! Press tab to play again");
        snakeArr=[ {x:13,y:15}];
        musicSound.play();
        score=0;
    }
    //If you have already eaten food increment the score n regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>Hiscoreval){
            Hiscoreval=score;
            localStorage.setItem("Hiscore",JSON.stringify(Hiscoreval));
            HiscoreBox.innerHTML="High Score: "+Hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //2.display snake 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //3.display food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

//main logic
let Hiscore=localStorage.getItem("Hiscore");
if(Hiscore===null){
    let Hiscoreval=0;
    localStorage.setItem("Hiscore",JSON.stringify(Hiscoreval));
}
else{
    Hiscoreval=JSON.parse(Hiscore); 
    HiscoreBox.innerHTML="High Score: "+Hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; //start game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrowup");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("Arrowdown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;            
        default:
            break;
    }
});