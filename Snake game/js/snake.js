//snake stuff

var snake;
var snakeLength;
var snakeSize;
var snakeDir;

var food;
var foodColor = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
var context;
var screenWidth;
var screenHeight;
//huds and menus
var gameState;
var gameOverM;
var rButton;
var playHUD;
var scoreBoard;
var Xmas = 1;
//menu and speed
var startMenu;
var speed;
var speed75;
var speed25;
var speed1;
var speed50;
var gameTime = 0;
var TimeYN;

//high score
var leaderBoard = document.getElementById("leaderB");
var high1;
var high2;
var high3;
var high4;
var high5;
var highNamex;
//audio & video
var snakeDead = new Audio("snakeBoom.mp3");
var snakeUp = new Audio("snakeUp.mp3");
var buttonPush = new Audio("smb_bump.wav");
var gameStart = new Audio("smb_jump-small.wav");
var timeOut = new Audio("smb_die.wav");
var musix;
var timeLow = new Audio("smb_warning.wav");
var toggleM = 2;
//animations
var snakeEx;
var foodEat;
var screenColor = "rgb(0, 170, 170)";
//functions for game
gameInitialize();
snakeInitialize();
foodInitialize();


//game stuff
function gameInitialize() {
    TimeYN = 2;
    snakeSize = 20;
    high1 = localStorage.getItem(high2);
    screenColor = "rgb(0, 170, 170)";
    var canvas = document.getElementById("snake-screen");
    context = canvas.getContext("2d");

    screenWidth = window.innerWidth - snakeSize * 2;
    screenHeight = window.innerHeight - snakeSize * 2;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    document.addEventListener("keydown", keyHandle);

    gameOverM = document.getElementById("fail");
    menuPos(gameOverM);

    rButton = document.getElementById("rbutton");
    rButton.addEventListener("click", gameRestart);

    pgR = document.getElementById("reloadpg");
    pgR.addEventListener("click", pageR);

    playHUD = document.getElementById("playHUD");
    scoreBoard = document.getElementById("scoreBoard");
    startMenu = document.getElementById("sMenu");

    speed75 = document.getElementById("idspeed75").addEventListener("mouseup", setSpeed75);
    speed50 = document.getElementById("idspeed50").addEventListener("click", setSpeed50);
    speed1 = document.getElementById("idspeed1").addEventListener("click", setSpeed1);
    speed25 = document.getElementById("idspeed25").addEventListener("click", setSpeed25);
    TimeAttackMode = document.getElementById("idtimeAt").addEventListener("click", timeAtt);
    bodyS = document.getElementById("bod");
    snowyg = document.getElementById("snowy");
    sroom = document.getElementById("mushroom");
    setState("menu");

    if (gameState === "menu") {
        startMenu.style.visibility = "visible";
        startMenu.style.left = (screenWidth / 2) - (startMenu.offsetWidth / 2) + 'px';
        showMenu("state");
    }
}

function gameloop() {
    gameDraw();
    dScoreBoard();
    XmasS();
    if (gameTime === 0 && timeYN === 1) {
        timeOut.play();
        setState("gameOver");
        return;
    }
    if (gameTime === 35 && timeYN === 1) {
        timeLow.play();
    }
    if (gameState === "play" && timeYN !== 1) {
        gameTime++;
        musix.play();
        snakeUpdate();
        snakeDraw();
        foodDraw();
        keyHandle(event);
        musix.play();
    }
    else if (gameState === "play" && timeYN === 1) {
        gameTime--;
        musix.play();
        snakeUpdate();
        snakeDraw();
        foodDraw();
        keyHandle(event);
    }
}
function gameDraw() {

    context.fillStyle = screenColor;
    context.fillRect(0, 0, screenWidth, screenHeight);
}
function pageR() {
    buttonPush.play();
    location.reload();
}
//end game stuff
//snake stuff
function snakeInitialize() {
    snake = [];
    snakeLength = 3;
    snakeSize = 20;
    snakeDir = "right";
    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
    }
}

function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = foodColor;
        context.strokeStyle = "black";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate(snakeHeadX, snakeHeadY) {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    checkFoodCol(snakeHeadX, snakeHeadY);
    checkWallCol(snakeHeadX, snakeHeadY);
    checkSnakeCol(snakeHeadX, snakeHeadY);

    if (snakeDir === "down") {
        snakeHeadY++;
    }
    else if (snakeDir === "right") {
        snakeHeadX++;
    }
    else if (snakeDir === "left") {
        snakeHeadX--;
    }
    else if (snakeDir === "up") {
        snakeHeadY--;
    }
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);

}
//end snake stuff
//food stuff
function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPos();
}

function foodDraw() {
    context.strokeStyle = foodColor;
    context.strokeRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
    context.drawImage(sroom, food.x * snakeSize, food.y * snakeSize, 20, 20);

}

function setFoodPos() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);

}
function checkFoodCol(snakeHeadX, snakeHeadY) {

    if (snakeHeadX === food.x && snakeHeadY === food.y && timeYN !== 1) {
        snake.push({
            x: 0,
            y: 0
        });
        setFoodPos();
        foodDraw();
        (snakeLength++);
        snakeUp.play();
        foodColor = 'hsl(' + 360 * Math.random() + ', 50%, 35%)';
    }
    else if (snakeHeadX === food.x && snakeHeadY === food.y && timeYN === 1) {
        snake.push({
            x: 0,
            y: 0
        });
        setFoodPos();
        foodDraw();
        (snakeLength++);
        snakeUp.play();
        foodColor = 'hsl(' + 360 * Math.random() + ', 50%, 35%)';
        gameTime = (gameTime + 50);
    }
}

//end food stuff
//key input
function keyHandle(event) {
    if (event.keyCode === 39 && snakeDir !== "left" || event.keyCode === 68 && snakeDir !== "left") {
        snakeDir = "right";
    }
    else if (event.keyCode === 37 && snakeDir !== "right" || event.keyCode === 65 && snakeDir !== "right") {
        snakeDir = "left";
    }
    else if (event.keyCode === 38 && snakeDir !== "down" || event.keyCode === 87 && snakeDir !== "down") {
        snakeDir = "up";
    }
    else if (event.keyCode === 40 && snakeDir !== "up" || event.keyCode === 83 && snakeDir !== "up") {
        snakeDir = "down";
    }
    else if (event.keyCode === 27) {
        console.log("works");
        (speed = speed + 500);

    }
    else if (event.keyCode === 82) {

        gameRestart();

    }
    else if (event.keyCode === 77) {
        if (toggleM === 2) {
            musix.volume = 0;
            toggleM = 1;
            musix.currentTime = 0;
        }
        else {
            musix.volume = 1;
            toggleM = 2;
        }

    }
    else if (event.keyCode === 67) {
        if (Xmas === 2) {
            Xmas = 1;
        } else {
            console.log("its close enough to the holidays");
            Xmas = 2;
        }
    }
    else if (event.keyCode === 49) {
        snakeLength = snakeLength + 1;
        snakeDraw();
        snake.push({
            x: 0,
            y: 0
        });
    }

    else {
        console.log("key???");
    }
}
//end key input
//collisions
function checkWallCol(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        setState("gameOver");
    }
    if (snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize < 0) {
        setState("gameOver");
    }
}
//end collisions
//states & menus
function highscorelist() {
    if (snakeLength > high1) {
        localStorage.setItem(high2, snakeLength);
        leaderBoard.innerHTML = "High score: " + "<br />" + localStorage.getItem(high2);
    }
    else {
        leaderBoard.innerHTML = "High score: " + "<br />" + localStorage.getItem(high2);
    }
}
function setState(state) {
    gameState = state;
    showMenu(state);
}

function disMenu(menu) {
    menu.style.visibility = "visible";
    showMenu("state");
}

function showMenu(state) {
    if (state === "gameOver") {

        musix.pause();
        musix.currentTime = 0;
        snakeDead.play();
        disMenu(gameOverM);
        snakeExplode();
        highscorelist();


    }
    else if (state === "play") {
        disMenu(playHUD);
    }
}
function hideMenu(menu) {
    menu.style.visibility = "hidden";
}
function menuPos(menu) {
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + 'px';
}
function gameRestart() {
    if (timeYN !== 1) {
        gameTime = 0;
        buttonPush.play();
        screenColor = "rgb(0, 170, 170)";
        snakeInitialize();
        foodInitialize();
        hideMenu(gameOverM);
        hideMenu(startMenu);
        setState("play");
        snakeDead.pause();
        snakeDead.currentTime = 0;
    }
    if (timeYN === 1) {
        gameTime = 100;
        buttonPush.play();
        screenColor = "rgb(0, 170, 170)";
        snakeInitialize();
        foodInitialize();
        hideMenu(gameOverM);
        hideMenu(startMenu);
        setState("play");
        snakeDead.pause();
        snakeDead.currentTime = 0;
    }
}
function dScoreBoard() {
    scoreBoard.innerHTML = " " + "Length: " + snakeLength + "<br/>" + "Time: " + gameTime;
}
function checkSnakeCol(snakeHeadX, snakeHeadY) {
    for (var index = 1; index < snake.length; index++) {
        if (snakeHeadX === snake[index].x && snakeHeadY === snake[index].y) {
            setState("gameOver");
            return;
        }
    }
}
//end states & menus
//game speed
function setSpeed1() {
    speed = 1;
    spaceSave();
}
function setSpeed50() {
    speed = 50;
    spaceSave();
}
function setSpeed75() {
    speed = 75;
    spaceSave();
}
function setSpeed25() {
    speed = 25;
    spaceSave();
}
function timeAtt() {
    musix = new Audio("SMB timeMusic.mp3");
    gameTime = 100;
    timeYN = 1;
    gameStart.play();
    speed = 50;
    buttonPush.play();
    snakeInitialize();
    foodInitialize();
    hideMenu(startMenu);
    setState("play");
    setInterval(gameloop, speed);
}
function spaceSave() {
    musix = new Audio("SMB music.mp3");
    timeYN = 2;
    gameStart.play();
    buttonPush.play();
    snakeInitialize();
    foodInitialize();
    hideMenu(startMenu);
    setState("play");
    setInterval(gameloop, speed);
}
//end game speed
//animations
function XmasS() {
    if (Xmas === 2) {
        var snowy = document.getElementById("snowy");
        context.drawImage(snowy, 0, 0, screenWidth, screenWidth);
    }
}
function snakeExplode(snakeHeadX, snakeHeadY) {
    screenColor = "rgb(170, 0, 0)";
    if (setState === "gameOver") {
    }
}
gameloop();