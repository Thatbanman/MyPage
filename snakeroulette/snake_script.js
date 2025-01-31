document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("play-button");
    const mainMenu = document.getElementById("main-menu");
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const gridSize = 20;
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
        gameInterval = setInterval(updateGame, 150);
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
        if (head.x < 0 || head.y < 0 || head.x >= canvas.width / gridSize || head.y >= canvas.height / gridSize) {
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
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "red";
        ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
        
        ctx.fillStyle = "purple";
        for (let poison of poisonApples) {
            ctx.fillRect(poison.x * gridSize, poison.y * gridSize, gridSize, gridSize);
        }

        ctx.fillStyle = "white";
        for (let part of snake) {
            ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
        }
    }

    function spawnApple() {
        return {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
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
