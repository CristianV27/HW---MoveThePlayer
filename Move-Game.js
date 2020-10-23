class Player {
  constructor(gameContainer, pion) {
    this.gameContainer = gameContainer;
    this.pion = pion;
  }

  registerMoving() {
    document.addEventListener("keydown", (e) => {
      this.movePlayer(e); 
    });
  }

  getPosition = (top, left, keyCode) => {
    var nextTop = parseInt(top);
    var nextLeft = parseInt(left);

    switch (keyCode) {
      case 38: //up
        nextTop = nextTop - 10;
        break;
      case 40: //down
        nextTop = nextTop + 10;
        break;
      case 37: // left
        nextLeft = nextLeft - 10;
        break;
      case 39: //right
        nextLeft = nextLeft + 10;
        break;
    }
    return { nextTop, nextLeft };
  };

  movePlayer = (e) => {
    const positions = this.getPosition(
      this.pion.style.top,
      this.pion.style.left,
      e.keyCode
    );
    console.log(positions);
    if (this.checkBorders(positions.nextLeft, positions.nextTop)) {
      this.pion.style.top = positions.nextTop + "px";
      this.pion.style.left = positions.nextLeft + "px";
    }
  };

  getPlayerSize() {
    const playerDiv = document.querySelector("#pion");
    const playerStyle = getComputedStyle(playerDiv);

    return {
      width: parseInt(playerStyle.width),
      height: parseInt(playerStyle.height),
    }
  }
  
  getContainerSize() {
    const gameContainer = document.querySelector("#gameContainer")
    const gameAeraStyle = getComputedStyle(gameContainer)

    return {
      width: parseInt(gameAeraStyle.width),
      height: parseInt(gameAeraStyle.height),
    }
  }
  // returneaza true sau false
  checkBorders(nextLeft, nextTop) {
    const gameContainer = this.getContainerSize();
    const playerSize = this.getPlayerSize();

    if (
      !(nextLeft < 0) &&
      !(nextTop < 0) &&
      !(nextLeft > gameContainer.width - playerSize.width) &&
      !(nextTop > gameContainer.height - playerSize.height)
    ) {
      return true;
    } else return false;
  }
}

const gameContainer = document.querySelector("#gameContainer");
const pion = document.querySelector("#pion");
const player1 = new Player(gameContainer, pion);
player1.registerMoving();
