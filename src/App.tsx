import { useState } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Score from "./components/Score";

const App = () => {
  const [mute, setMute] = useState<boolean>(false);
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isXTurn, setIsXTurn] = useState(true); 

  const handleCellClick = (index: number) => {
    const newBoard = [...board];
    // Check if the cell is already filled
    if (newBoard[index] === '') {
      newBoard[index] = isXTurn ? 'X' : 'O';
      setBoard(newBoard);
      setIsXTurn(!isXTurn);  // Toggle turn
    }
  };

  return (
    <>
      <Header mute={mute} handleMuteButton={setMute} />
      <Board board={board} handleCellClick={handleCellClick} />
      <Score />
    </>
  );
};

export default App;
