import React, { useState, useEffect } from "react";
import { createNewGame, makeMove } from "../../../generales/apicalls";
import GameButton from "../GameComponents/gameButtons/GameButton";
import YellowToken from "../../../assets/YellowToken.svg";
import RedToken from "../../../assets/RedToken.svg";
import "./game.css";
import Container from "react-bootstrap/Container";

const Game = () => {
  const [gameId, setGameId] = useState(148);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      if (gameId !== null) {
        const response = await createNewGame(gameId);
        setGameState(response);
      }
    } catch (error) {
      console.error("Error fetching game state:", error);
    }
  };

  const handleClick = async (columnIndex) => {
    try {
      if (gameId === null || gameState?.winner !== null) {
        console.error("Game not started yet or already won");
        return;
      }
      const response = await makeMove(gameId, columnIndex);
      setGameState(response);
    } catch (error) {
      console.error("Failed to make move:", error);
    }
  };

  const renderSquare = (index) => {
    const token = gameState?.moves[index];
    let tokenImage = null;
    if (token === "X") {
      tokenImage = <img src={RedToken} alt="Red Token" />;
    } else if (token === "O") {
      tokenImage = <img src={YellowToken} alt="Yellow Token" />;
    }
    return (
      <GameButton value={tokenImage} clickFn={() => handleClick(index % 7)} />
    );
  };

  return (
    <div className="MainGame">
      {gameState?.winner !== null ? (
        <h1>
          Winner:{" "}
          {gameState?.winner === "X"
            ? gameState?.player_1_name
            : gameState?.player_2_name}
        </h1>
      ) : (
        <h1>Current Turn: {gameState?.current_turn}</h1>
      )}
      <Container className="d-flex flex-column align-items-center">
        <div className="gameRows">
          {Array.from({ length: 7 }, (_, colIndex) => (
            <div className="gameRow" key={colIndex}>
              {Array.from({ length: 6 }, (_, rowIndex) => {
                const index = (5 - rowIndex) * 7 + colIndex;
                return (
                  <div className="gridchild" key={index}>
                    {renderSquare(index)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Game;
