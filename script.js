alert('SNAKE GAME! Clique em ok para Jogar!');  

    let canvas = document.getElementById("snake");  
    let context = canvas.getContext("2d");  
    let box = 32;  
    let snake = [];  
    snake[0] = {  
        x: 1 * box,  
        y: 1 * box,  
    };  

    let direction = "right";  

    let food = {  
        x: Math.floor(Math.random() * 15 + 1) * box,  
        y: Math.floor(Math.random() * 15 + 1) * box  
    };  

    let score = 0;  

    function criarBG() {  
        context.fillStyle = "black";  
        context.fillRect(0, 0, 16 * box, 16 * box);  
    }  

    function criarCobrinha() {  
        for (i = 0; i < snake.length; i++) {  
            context.fillStyle = "rgb(240, 177, 3)";  
            context.fillRect(snake[i].x, snake[i].y, box, box);  
        }  
    }  

    function drawFood() {  
        context.fillStyle = "white";  
        context.fillRect(food.x, food.y, box, box);  
    }  

    function drawScore() {  
        context.fillStyle = "white";  
        context.font = "20px Arial";  
        context.fillText("Score: " + score, box, box);  
    }  

    document.addEventListener('keydown', update);  

    function update(event) {  
        if (event.keyCode == 37 && direction != "right") direction = "left";  
        if (event.keyCode == 38 && direction != "down") direction = "up";  
        if (event.keyCode == 39 && direction != "left") direction = "right";  
        if (event.keyCode == 40 && direction != "up") direction = "down";  
    }  

    function changeDirection(newDirection) {  
        if (newDirection == "left" && direction != "right") direction = "left";  
        if (newDirection == "up" && direction != "down") direction = "up";  
        if (newDirection == "right" && direction != "left") direction = "right";  
        if (newDirection == "down" && direction != "up") direction = "down";  
    }  

    function iniciarJogo() {  
        if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;  
        if (snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;  
        if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;  
        if (snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;  

        for (i = 1; i < snake.length; i++) {  
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {  
                clearInterval(jogo);  
                alert('Game Over');  
            }  
        }  

        criarBG();  
        criarCobrinha();  
        drawFood();  
        drawScore();  

        let snakeX = snake[0].x;  
        let snakeY = snake[0].y;  

        if (direction == "right") snakeX += box;  
        if (direction == "left") snakeX -= box;  
        if (direction == "up") snakeY -= box;  
        if (direction == "down") snakeY += box;  

        if (snakeX != food.x || snakeY != food.y) {  
            snake.pop();  
        } else {  
            food.x = Math.floor(Math.random() * 15 + 1) * box;  
            food.y = Math.floor(Math.random() * 15 + 1) * box;  
            score++;  
        }  

        let newHead = {  
            x: snakeX,  
            y: snakeY  
        };  

        snake.unshift(newHead);  
    }  

    let jogo = setInterval(iniciarJogo, 150);  