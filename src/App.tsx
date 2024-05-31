import { useState } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Score from "./components/Score";

const App = () => {
  const [mute, setMute] = useState<boolean>(false);



  return (
    <>
      <Header mute={mute} handleMuteButton={setMute}/>
      <Board />
      <Score />
    </>
  );
};

export default App;
