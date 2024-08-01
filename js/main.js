class Player {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.positionX = 0;
        this.positionY = 0;
        this.speed = 5;

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

        this.positionX = Math.floor(Math.random() * (400 - this.width + 1));
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
        this.newimg.setAttribute('src', "./images/close.png");
        this.domElement.appendChild(this.newimg);
    }

    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "px";
    }
}



const player = new Player();
const prizeArr = [];
const obstacleArr = [];


// generate obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacleArr.push(newObstacle)
}, 4000);

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
