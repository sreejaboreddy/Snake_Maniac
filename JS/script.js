// Game Constants

let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const bgsound = new Audio('music.mp3');
let score = 0;
let paintTime = 0;
let speed = 15;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 };

// Game Functions
var s = false;
Paused =()=>{
    return s;
}
paint = (Time) => {
    window.requestAnimationFrame(paint);
    if ((Time - paintTime) / 1000 < 1 / speed) {
        return;
    }
    paintTime = Time;
    gameEngine();
}
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if ((snake[0].x >= 22 || snake[0].x <= 0) || (snake[0].y >= 18 || snake[0].y <= 0)) {
        return true;
    }

    return false;
}
// If you have eaten the food, increment the score and regenerate the food
gameEngine = () => {
    // updating the snake array and food
    if (isCollide(snakeArr)) {
        gameoversound.play();
        GameOver.classList.add('GameOvered');
        bgsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game is Over. Press any key to play again.");
        GameOver.classList.remove('GameOvered');
        snakeArr = [{ x: 13, y: 15 }]
        // bgsound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score += 1;

        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        if(Paused()){
            continue;
        }
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
            // bgsound.play();
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Game Logics
let hiscore = localStorage.getItem("hiscore");
let C_name = localStorage.getItem("name");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscore = localStorage.getItem('hiscore');
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}
window.requestAnimationFrame(paint);

window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 0 };
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            s = false;
            console.log("ArrowUp");
            console.log(inputDir);
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            s = false;
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            s = false;
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            s = false;
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case " ":
            s = true;
            PausedBox.classList.add('Paused');
            alert("Game Paused Press any Key to resume");
            PausedBox.classList.remove('Paused');
            break;
        default:
            break;
    }
})
