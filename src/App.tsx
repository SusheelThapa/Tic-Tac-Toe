import { useState } from "react";
import useSound from "use-sound";

import Board from "./components/Board";
import Header from "./components/Header";
import Score from "./components/Score";

import noteHigh from "./assets/audio/note-high.mp3";
import noteLow from "./assets/audio/note-low.mp3";

const App = () => {
  const [mute, setMute] = useState<boolean>(false);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

  const [playHighNote] = useSound(noteHigh, { volume: mute ? 0 : 1 });
  const [playLowNote] = useSound(noteLow, { volume: mute ? 0 : 1 });

  const handleCellClick = (index: number) => {
    const newBoard = [...board];
    // Check if the cell is already filled
    if (newBoard[index] === "") {
      newBoard[index] = isXTurn ? "X" : "O";
      setBoard(newBoard);

      if (isXTurn) {
        playHighNote();
      } else {
        playLowNote();
      }

      setIsXTurn(!isXTurn); // Toggle turn
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
