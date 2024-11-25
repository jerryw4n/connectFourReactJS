import React from 'react';
import './ConnectFour.css'; // Import the Connect Four CSS

class ConnectFour extends React.Component {
  constructor(props) {
    super(props); // Call the parent constructor
    this.state = {
      initialMatrix: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      currentPlayer: 1,
      gameOver: false, // New state property to track if the game is over
    };
  }

  fillBox = (e) => {
    if (this.state.gameOver) return; // Prevent further moves if the game is over

    const colValue = parseInt(e.target.getAttribute("data-value"), 10);
    this.setPiece(5, colValue);
  };

  setPiece = (startCount, colValue) => {
    let initialMatrix = this.state.initialMatrix;
    const rows = document.querySelectorAll(".grid-row");

    if (startCount < 0) {
      alert("Column full, select again");
      return; // Do not switch turn; player retries
    }

    if (initialMatrix[startCount][colValue] !== 0) {
      this.setPiece(startCount - 1, colValue); // Try the row above
    } else {
      const currentRow = rows[startCount].querySelectorAll(".grid-box");
      currentRow[colValue].classList.add(
        "filled",
        `player${this.state.currentPlayer}`
      );
      initialMatrix[startCount][colValue] = this.state.currentPlayer;

      if (this.winCheck()) {
        alert(`Player ${this.state.currentPlayer} wins!`);
        this.setState({ gameOver: true }); // Set gameOver to true
        return;
      }

      this.setState((prevState) => ({
        currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
      }));
      this.gameOverCheck();
    }
  };

  winCheck = () => {
    return (
      this.checkHorizontal() ||
      this.checkVertical() ||
      this.checkPositiveDiagonal() ||
      this.checkNegativeDiagonal()
    );
  };

  checkHorizontal = () => {
    const { initialMatrix } = this.state;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          initialMatrix[row][col] &&
          initialMatrix[row][col] === initialMatrix[row][col + 1] &&
          initialMatrix[row][col] === initialMatrix[row][col + 2] &&
          initialMatrix[row][col] === initialMatrix[row][col + 3]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  checkVertical = () => {
    const { initialMatrix } = this.state;
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          initialMatrix[row][col] &&
          initialMatrix[row][col] === initialMatrix[row + 1][col] &&
          initialMatrix[row][col] === initialMatrix[row + 2][col] &&
          initialMatrix[row][col] === initialMatrix[row + 3][col]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  checkPositiveDiagonal = () => {
    const { initialMatrix } = this.state;
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          initialMatrix[row][col] &&
          initialMatrix[row][col] === initialMatrix[row - 1][col + 1] &&
          initialMatrix[row][col] === initialMatrix[row - 2][col + 2] &&
          initialMatrix[row][col] === initialMatrix[row - 3][col + 3]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  checkNegativeDiagonal = () => {
    const { initialMatrix } = this.state;
    for (let row = 3; row < 6; row++) {
      for (let col = 3; col < 7; col++) {
        if (
          initialMatrix[row][col] &&
          initialMatrix[row][col] === initialMatrix[row - 1][col - 1] &&
          initialMatrix[row][col] === initialMatrix[row - 2][col - 2] &&
          initialMatrix[row][col] === initialMatrix[row - 3][col - 3]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  gameOverCheck = () => {
    const { initialMatrix } = this.state;
    const isFull = initialMatrix.every((row) => row.every((val) => val !== 0));

    if (isFull) {
      alert("Game over! The board is full.");
      this.setState({ gameOver: true });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          {[...Array(6)].map((_, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              {[...Array(7)].map((_, colIdx) => (
                <div
                  key={colIdx}
                  className="grid-box"
                  data-value={colIdx}
                  onClick={(e) => this.fillBox(e)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div id="information">
          <div className="player-wrappers">
            Player 1
            <div className="player1"></div>
          </div>
          <div className="player-wrappers">
            Player 2
            <div className="player2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectFour;
