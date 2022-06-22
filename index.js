const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d')

let score = 0
let lives = 3

//Paddle Properties
const paddle = {
    x: canvas.width / 2 - 100,
    y: 875,
    w: 200, 
    h: 30,
    speed: 8,
    dx: 0
}

const paddle_img = new Image()
paddle_img.src = "./images/paddle.png"

function drawPaddle() {
    // ctx.beginPath()
    // ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    // ctx.fillStyle = '/images/paddle.png'
    // ctx.fill()
    // ctx.closePath()
    ctx.drawImage(paddle_img, paddle.x, paddle.y, paddle.w, paddle.h,)
}

//Ball properties
const ball = {
    x: canvas.width / 2,
    y: 850,
    size: 10, 
    radius: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

const ball_img = new Image()
ball_img.src = "./images/ball.png"

function drawBall() {
    // ctx.beginPath();
    // ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    // ctx.fillStyle = '#ffffff'
    // ctx.fill()
    // ctx.closePath()
    ctx.drawImage(ball_img, ball.x, ball.y, 20, 20)
}

//Brick Properties
const rowsOfBricks = 6;
const columnsOfBricks = 12;

const brickSize = {
    w: 100,
    h: 30, 
    padding: 10,
    offsetX: 45, 
    offsetY: 60, 
    visible: true
}

const bricks = []
for (let i = 0; i < columnsOfBricks; i++) {
    bricks[i] = []
    for (let j = 0; j < rowsOfBricks; j++) {
        const x = i * (brickSize.w + brickSize.padding) + brickSize.offsetX
        const y = j * (brickSize.h + brickSize.padding) + brickSize.offsetY
        bricks[i][j] = {x, y, ...brickSize}
    }
}
const brick_img = new Image()
brick_img.src = "./images/green-tile.png"

function drawBricks() {
    bricks.forEach(column => { 
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? ctx.drawImage(brick_img, brick.x, brick.y, brick.w, brick.h) : 'transparent';
            ctx.fill();
            ctx.closePath();
            //ctx.drawImage(brick_img, brick.x, brick.y, brick.w, brick.h)
        })
    })
}


//Paddle Movement
function movePaddle() {
    paddle.x += paddle.dx;

    //Wall Colision
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }

    if(paddle.x < 0) {
        paddle.x = 0;
    }
}

//Ball movement along the canvas
function moveBall() {
    ball.x += ball.dx
    ball.y += ball.dy

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    if (
        ball.x - ball.size > paddle.x && 
        ball.x + ball.size < paddle.x + paddle.w && 
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed;
    }

    if (
        ball.y + ball.size > canvas.height
    ) {
        resetBall();
    }

function resetBall() {
    ball.x = canvas.width/2
    ball.y = paddle.y - ball.size
    ball.dx = 4 
    ball.dy = -4
}

//Brick Collision  
bricks.forEach(column => {
    column.forEach(brick => {
         if (brick.visible) {
            if (ball.x + ball.radius > brick.x &&
                ball.x - ball.radius < brick.x + brick.w &&
                ball.y + ball.radius > brick.y &&
                ball.y - ball.radius < brick.y + brick.h
            ) {
                ball.dy *= -1
                brick.visible = false
            }
        }
        })
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    drawPaddle();
    drawBricks();
}

function drawPoints() {
    ctx.font = '20 px Arial #ffffff';
    ctx.fillText(`Score: ${score}`, 1300, 0)
}

draw();

function update() {
    movePaddle();
    moveBall();
    drawPoints();
    draw();

    requestAnimationFrame(update);
}

update();

//keyUp-Down Events
function keyUp(e) {
    if(e.key === 'a' || e.key === 'd') {
        paddle.dx = 0;
    }
}

function keyDown(e) {
    if(e.key === 'a') {
        paddle.dx = -paddle.speed;
    } else if (e.key === 'd') {
        paddle.dx = paddle.speed
    }
}

//keyboard event handlers
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown)
/*
const lvl1 = [
    [6,6,6,6,6,6,6,6,6,6,6,6],
    [6,6,6,6,6,6,6,6,6,6,6,6],
    [4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4],
    [2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2]
];

const lvl2 = [
    [6,0,0,0,6,4,4,6,0,0,0,6],
    [4,6,0,0,0,6,6,0,0,0,6,4],
    [2,4,6,0,0,2,2,0,0,6,4,2],
    [2,4,6,0,0,2,2,0,0,6,4,2],
    [4,6,0,0,0,6,6,0,0,0,6,4],
    [6,0,0,0,6,4,4,6,0,0,0,6]
]*/

