class Player {
    constructor() {
        this.width = "1px";
        this.height = "1px";
        this.positionX = 10;
        this.positionY = 10;
       
        this.createDomElm();

    }

    createDomElm() {

        this.domElement = document.createElement("img");
        this.domElement.src = "./images/heart.png";
        this.domElement.alt = "Player Image";
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.heigth = this.heigth + "px";
        this.domElement.style.left = this.positionX + "px";
        this.domElement.style.bottom = this.positionY + "px";

        const container = document.getElementById("container");
        if (container) {
            container.appendChild(this.domElement);
        }
       

    }
    moveLeft() {
        this.positionX--;
        this.domElement.style.left = this.positionX + "px";
    }
    moveRight() {
        this.positionX++;
        this.domElement.style.left = this.positionX + "px";
    }
    moveDown() {
        this.positionY--;
        this.domElement.style.bottom= this.positionY + "px";
    }
    moveUp() {
        this.positionY++;
        this.domElement.style.bottom = this.positionY + "px";
    }

}

    class Prize {
        constructor() {
            this.width = 10;
            this.heght = 10;
            

        }
    }


    class Obstacle {
        constructor () {
            this.width = 1;
            this.height = 1;
            this.positionX = Math.floor(Math.random() * (100- this.width + 1)) + "px";
            this.positionY = Math.floor(Math.random() * (100 - this.width + 1)) + "px";

            this.creatDomElm();
        }

    creatDomElm () {
        this.domElement = document.createElement("img");
        this.domElement.src = "./images/close.png";
        this.domElement.alt = "Obstacle Image";
        this.domElement.id = "obstacle";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.heigth = this.height + "px";
        this.domElement.style.left = this.positionX + "px";
        this.domElement.style.bottom = this.positionY + "px";
        
        const container = document.getElementById("container");
        if (container) {
            container.appendChild(this.domElement); 
        }
    }
   
    moveDown() {
        this.positionY--;
        this.domElement.style.bottom= this.positionY + "px";
    }
}



    const player = new Player();
    const prize = [];
    const obstacle = [];


    
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


 /* newDomElement()
    
    this.DomElement = document.createElement("div");
    this.DomElement = "game-container";


const gamecontainer = document.getElementById('game-container');
 
*/ 