const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d')

let score = 0

//Paddle Properties
const paddle = {
    x: canvas.width / 2 - 100,
    y: 875,
    w: 200, 
    h: 30,
    speed: 8,
    dx: 0
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.closePath()
}

//Ball properties
const ball = {
    x: canvas.width / 2,
    y: 850,
    size: 10, 
    speed: 4,
    dx: 4,
    dy: -4
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.closePath()
}

//Brick Properties
const rowsOfBricks = 12;
const columnsOfBricks = 8;

const brickSize = {
    w: 100,
    h: 30, 
    padding: 10,
    offsetX: 45, 
    offsetY: 60, 
    visible: true
}

const bricks = []
for (let i = 0; i < rowsOfBricks; i++) {
    bricks[i] = []
    for (let j = 0; j < columnsOfBricks; j++) {
        const x = i * (brickSize.w + brickSize.padding) + brickSize.offsetX
        const y = j * (brickSize.h + brickSize.padding) + brickSize.offsetY
        bricks[i][j] = {x, y, ...brickSize}
    }
}

function drawBricks() {
    bricks.forEach(column => { 
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#ffffff' : 'transparent';
            ctx.fill();
            ctx.closePath();
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
        ball.dy *= -ball.speed;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    drawPaddle();
    drawBricks();
}

function drawPoints() {
    ctx.font = '20 px Arial #ffffff';
    ctx.fillText(`Score: ${score}`, canvas.width - 1000, 30)
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