const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 175, y: 500, width: 50, height: 100, speed: 10 };
let ball = { x: player.x + 20, y: player.y - 20, radius: 10, vy: 0, flying: false };
let hoop = { x: 170, y: 100, width: 60, height: 20 };
let score = 0;
let timeLeft = 60;

// 偵測觸控 / 滑鼠
canvas.addEventListener("mousedown", (e) => {
    const clickX = e.offsetX;
    if (clickX < canvas.width / 2) {
        player.x -= player.speed;
    } else {
        player.x += player.speed;
    }
    if (!ball.flying) {
        ball.flying = true;
        ball.vy = -8;
        ball.x = player.x + 20;
        ball.y = player.y - 20;
    }
});

// 遊戲主循環
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 畫籃框
    ctx.fillStyle = "orange";
    ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);

    // 畫玩家
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 球飛行
    if (ball.flying) {
        ball.y += ball.vy;
        if (ball.y < hoop.y + hoop.height && 
            ball.x > hoop.x && 
            ball.x < hoop.x + hoop.width) {
            score++;
            ball.flying = false;
            ball.y = player.y - 20;
            ball.x = player.x + 20;
        }
        if (ball.y < 0) {
            ball.flying = false;
            ball.y = player.y - 20;
            ball.x = player.x + 20;
        }
    }

    // 畫球
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fill();

    // 畫分數
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // 畫倒數
    ctx.fillText("Time: " + Math.floor(timeLeft), 300, 30);

    requestAnimationFrame(update);
}
update();

// 倒數計時
setInterval(() => {
    if (timeLeft > 0) timeLeft -= 1;
}, 1000);
