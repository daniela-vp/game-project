class Player {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.positionX = 0;
        this.positionY = 0;
        this.speed = 6;

        this.createDomElm();

    }

    createDomElm() {

        this.domElement = document.createElement("div");
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.heigth = this.height + "px";
        this.domElement.style.left = this.positionX + "px";
        this.domElement.style.bottom = this.positionY + "px";
        this.domElement.style.position = "absolute";

        const container = document.getElementById("container");
        container.appendChild(this.domElement);
        this.playerImg = document.createElement('img');
        this.playerImg.setAttribute('src', "./images/heart.png");
        this.playerImg.style.width = "100%";
        this.playerImg.style.height = "100%";
        this.domElement.appendChild(this.playerImg);

    }
    moveLeft() {
        this.positionX -= this.speed;
        this.domElement.style.left = this.positionX + "px";
    }
    moveRight() {
        this.positionX += this.speed;
        this.domElement.style.left = this.positionX + "px";
    }
    moveDown() {
        this.positionY -= this.speed;
        this.domElement.style.bottom = this.positionY + "px";
    }
    moveUp() {
        this.positionY += this.speed;
        this.domElement.style.bottom = this.positionY + "px";
    }

}

class Obstacle {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.margin = 10;

        this.containerWidth = container.offsetWidth;
        this.containerHeigth = container.offsetHeight;

        this.positionX = Math.floor(Math.random() * (600 - this.width + 1));
        this.positionY = this.containerHeigth - this.height;

        this.createDomElm();
    }

    createDomElm() {
        this.domElement = document.createElement("div");
        this.domElement.className = "obstacle";
        this.domElement.style.left = this.positionX + "px";
        this.domElement.style.bottom = this.positionY + "px";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.heigth = this.height + "px";


        const container = document.getElementById("container");
        container.appendChild(this.domElement);
        this.newimg = document.createElement('img');
        this.newimg.setAttribute('src', "./images/caution.png");
        this.domElement.appendChild(this.newimg);
    }

    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "px";
    }
    repositionIfColliding() {
        for (const obstacleInstance of obstacleArr) {
            while (isColliding(this, obstacleInstance)) {
                this.positionX = Math.random() * (600 - this.width);
                this.positionY = 400;
                this.domElement.style.left = this.positionX + "px";
                this.domElement.style.bottom = this.positionY + "px";
            }
        }
    }
}

class Prize {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.margin = 10;
        this.collided = false;

        this.containerWidth = container.offsetWidth;
        this.containerHeigth = container.offsetHeight;

        this.prizeImg = [
            './images/lighthouse.png',
            './images/thunder.png',
            './images/gambling.png',
            './images/lightning-bolt.png',
            './images/label.png',
            './images/money-bag.png',
            './images/half-moon.png',
            './images/umbrella.png',
        ]

        this.positionX = Math.floor(Math.random() * (600 - this.width + 1));
        this.positionY = this.containerHeigth - this.height;

        this.prize = this.createDomElm();
        this.repositionIfColliding();
    }

    createDomElm() {
        this.domElement = document.createElement("div");
        this.domElement.className = "prize";
        this.domElement.style.left = this.positionX + "px";
        this.domElement.style.bottom = this.positionY + "px";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.heigth = this.height + "px";


        const container = document.getElementById("container");
        container.appendChild(this.domElement);

        const randomImage = this.prizeImg[Math.floor(Math.random() * this.prizeImg.length)];

        this.prizeImg = document.createElement('img');
        this.prizeImg.setAttribute('src', randomImage);
        this.domElement.appendChild(this.prizeImg);

        return this.domElement;
    }

    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "px";
    }
    /// reposition of obstacles & prizes
    repositionIfColliding() {
        for (const obstacleInstance of obstacleArr) {
            while (isColliding(this, obstacleInstance)) {
                this.positionX = Math.random() * (600 - this.width);
                this.positionY = 400;
                this.domElement.style.left = this.positionX + "px";
                this.domElement.style.bottom = this.positionY + "px";
            }
        }
    }
}



const player = new Player();
const prizeArr = [];
const obstacleArr = [];
let score = 0;



// generate obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacleArr.push(newObstacle)
}, 3000);

setInterval(() => {
    obstacleArr.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();

        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ) {

            location.href = "gameover.html";

        }
    });
}, 50);

/// prizes
function updateScore() {
    score++;
    document.getElementById('score').textContent = `Flashes: ${score}`;
}

setInterval(() => {
    const newPrize = new Prize();
    prizeArr.push(newPrize)
}, 3000);

setInterval(() => {
    prizeArr.forEach((prizeInstance) => {
        prizeInstance.moveDown();

        if (
            player.positionX < prizeInstance.positionX + prizeInstance.width &&
            player.positionX + player.width > prizeInstance.positionX &&
            player.positionY < prizeInstance.positionY + prizeInstance.height &&
            player.positionY + player.height > prizeInstance.positionY
        ) {
            if (!prizeInstance.collided) {
                updateScore();
                prizeInstance.collided = true;
                prizeInstance.prize.remove();
            }

        }
    });
}, 50);


/// function to track prizes and obstacles colliding

function isColliding(prize, obstacle) {
    return (
        prize.positionX < obstacle.positionX + obstacle.width &&
        prize.positionX + prize.width > obstacle.positionX &&
        prize.positionY < obstacle.positionY + obstacle.height &&
        prize.positionY + prize.height > obstacle.positionY
    );
}

function checkPrizeObstacleCollisions() {
    for (const prizeInstance of prizeArr) {
        for (const obstacleInstance of obstacleArr) {
            if (isColliding(prizeInstance, obstacleInstance)) {
                // Reposition the prize
                prizeInstance.positionX = Math.floor(Math.random() * (600 - prizeInstance.width));
                prizeInstance.positionY = 400;
                prizeInstance.domElement.style.left = prizeInstance.positionX + "px";
                prizeInstance.domElement.style.bottom = prizeInstance.positionY + "px";
            }
        }
    }
}

setInterval(checkPrizeObstacleCollisions, 100);



document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.code === 'ArrowRight') {
        player.moveRight();
    } else if (e.code === 'ArrowDown') {
        player.moveDown();
    } else if (e.code === 'ArrowUp') {
        player.moveUp();
    }
});
