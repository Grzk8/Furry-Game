function Furry(){
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}
function Coin(){
    this.x = Math.floor(Math.random() *10);
    this.y = Math.floor(Math.random() *10);
}

function Game(){
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry ();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    }
    this.showFurry = function(){
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    }
    this.showCoin = function(){
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }
    const self = this;
	this.startGame = setInterval(function () {
		self.moveFurry()
	}, 250);

    this.moveFurry = function(){
        this.hideVisibleFurry();
        if(this.furry.direction === "right") {
            this.furry.x += 1;
        } else if (this.furry.direction === "left") {
            this.furry.x -= 1 ;
        } else if (this.furry.direction === "down") {
            this.furry.y += 1 ;
        } else if (this.furry.direction === "up") {
            this.furry.y -= 1 ;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();    
    }

    this.hideVisibleFurry = function(){
        const killFurry = document.querySelector(".furry");
        if (killFurry) {
            killFurry.classList.remove("furry");
        }
    }
    this.turnFurry = function (event) {
		switch (event.which) {
			case 37:
				this.furry.direction = "left";
				break;
			case 38:
				this.furry.direction = "up";
				break;
			case 39:
				this.furry.direction = "right";
				break;
			case 40:
				this.furry.direction = "down";
				break;
		}
    }
    document.addEventListener("keydown", function () {
        self.turnFurry(event);
    });
    this.checkCoinCollision = function(){
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            
            const scoreCount = document.querySelector("#score strong");
            let num = scoreCount.innerText;
            scoreCount.innerText = parseInt(num) + 1;
            this.score = scoreCount.innerText;
            const newcoin = new Coin();
            this.coin = new Coin();
			this.showCoin();
        }
    }
    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            board.style.display = "none";
            const over = document.querySelector("#over");
            over.style.display = "block";
            const button = over.querySelector("button");
			button.addEventListener("click", function () {
				location.reload();
            })
        }
    }
} 

const game = new Game();
game.showFurry();
game.showCoin();
game.startGame;

