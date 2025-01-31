document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("play-button");
    const mainMenu = document.getElementById("main-menu");
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let snake = [{ x: 10, y: 10 }];
    let direction = "RIGHT";
    let apple = spawnApple();
    let poisonApples = [];
    let gameInterval;

    playButton.addEventListener("click", function() {
        mainMenu.style.display = "none";
        canvas.style.display = "block";
        startGame();
    });

    function startGame() {
        gameInterval = setInterval(updateGame, 100);
        document.addEventListener("keydown", changeDirection);
    }

    function updateGame() {
        moveSnake();
        checkCollisions();
        drawGame();
    }

    function moveSnake() {
        let head = { ...snake[0] };
        if (direction === "RIGHT") head.x++;
        if (direction === "LEFT") head.x--;
        if (direction === "UP") head.y--;
        if (direction === "DOWN") head.y++;
        
        snake.unshift(head);
        
        if (head.x === apple.x && head.y === apple.y) {
            apple = spawnApple();
            poisonApples.push(spawnApple());
        } else {
            snake.pop();
        }
    }

    function checkCollisions() {
        let head = snake[0];
        if (head.x < 0 || head.y < 0 || head.x >= canvas.width / 20 || head.y >= canvas.height / 20) {
            endGame();
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                endGame();
            }
        }
        for (let poison of poisonApples) {
            if (head.x === poison.x && head.y === poison.y) {
                canvas.style.backgroundColor = "green";
                endGame();
            }
        }
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(apple.x * 20, apple.y * 20, 20, 20);
        
        ctx.fillStyle = "purple";
        for (let poison of poisonApples) {
            ctx.fillRect(poison.x * 20, poison.y * 20, 20, 20);
        }

        ctx.fillStyle = "white";
        for (let part of snake) {
            ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
        }
    }

    function spawnApple() {
        return {
            x: Math.floor(Math.random() * (canvas.width / 20)),
            y: Math.floor(Math.random() * (canvas.height / 20))
        };
    }

    function changeDirection(event) {
        if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    }

    function endGame() {
        clearInterval(gameInterval);
        alert("Game Over!");
        location.reload();
    }
});
