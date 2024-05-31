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
  const [animationTriggers, setAnimationTriggers] = useState<boolean[]>(Array(9).fill(false));

  const [playHighNote] = useSound(noteHigh, { volume: mute ? 0 : 1 });
  const [playLowNote] = useSound(noteLow, { volume: mute ? 0 : 1 });

  const handleCellClick = (index: number) => {
    if (board[index] !== '') return;  // Prevent overwriting a cell

    const newBoard = [...board];
    const newTriggers = Array(9).fill(false); // Reset all triggers

    newBoard[index] = isXTurn ? 'X' : 'O';
    newTriggers[index] = true; // Trigger animation only for the clicked cell

    setBoard(newBoard);
    setAnimationTriggers(newTriggers);

    if (isXTurn) {
      playHighNote();
    } else {
      playLowNote();
    }

    setIsXTurn(!isXTurn);  // Toggle turn
  };

  return (
    <>
      <Header mute={mute} handleMuteButton={setMute} />
      <Board board={board} handleCellClick={handleCellClick}  animationTriggers={animationTriggers} />
      <Score />
    </>
  );
};

export default App;
