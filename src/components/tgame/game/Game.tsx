import React, { useState, useEffect } from "react";
import { createNewGame, makeMove } from "../../../generales/apicalls";
import GameButton from "../GameComponents/gameButtons/GameButton";
import YellowToken from "../../../assets/YellowToken.svg";
import RedToken from "../../../assets/RedToken.svg";
import "./game.css";
import Container from "react-bootstrap/Container";

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [playerFlip, setPlayerFlip] = useState(true); // To track player flip

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await createNewGame();
      setGameId(response.id);
      setGameState(response);
      console.log(`Game with ID ${response.id} has started.`);
      console.log(`Game ID: ${response.id}`);
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
      const currentPlayerName =
        gameState.current_turn === "X"
          ? gameState.player_1_name
          : gameState.player_2_name;

      console.log(`${currentPlayerName} made move in column ${columnIndex}.`);
      const response = await makeMove(gameId, columnIndex);
      setGameState(response);
      console.log(`Moves: ${JSON.stringify(response.moves)}`);
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
      <GameButton
        value={tokenImage}
        clickFn={() => handleClick(index % 7)}
      />
    );
  };

  const handlePlayerFlip = () => {
    setPlayerFlip((prevFlip) => !prevFlip);
  };

  const renderPlayerName = (playerName) => {
    return playerName !== "Humain" ? playerName : "Humain";
  };

  return (
    <div className="MainGame">
      <div className="PlayerFlipButtons">
        <button onClick={handlePlayerFlip}>
          {renderPlayerName(
            playerFlip ? "player_1_name" : "player_2_name"
          )}
        </button>
        <button onClick={handlePlayerFlip}>
          {renderPlayerName(
            playerFlip ? "player_2_name" : "player_1_name"
          )}
        </button>
      </div>
      {gameState?.winner !== null ? (
        <h1>
          Winner:{" "}
          {gameState?.winner === "X"
            ? renderPlayerName("player_1_name")
            : renderPlayerName("player_2_name")}
        </h1>
      ) : (
        <h1>
          Current Turn:{" "}
          {renderPlayerName(
            playerFlip ? "player_1_name" : "player_2_name"
          )}
        </h1>
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
      <div className="StartGameButton">
        <button onClick={fetchGameState}>Démarrer la partie</button>
      </div>
    </div>
  );
};

export default Game;
