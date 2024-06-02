// Board.tsx

import { motion } from "framer-motion";

interface Props {
  board: string[];
  handleCellClick: (index: number) => void;
  animationTriggers: boolean[];
}

const Board = ({ board, handleCellClick, animationTriggers }: Props) => {
  const X = ({ shouldAnimate }: { shouldAnimate: boolean }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        shouldAnimate ? { opacity: 1, scale: [0, 1.2, 1] } : { opacity: 1 }
      }
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="relative w-full h-full">
        <div
          className="absolute bg-white h-4 w-full transform -rotate-45"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-45deg)",
          }}
        />
        <div
          className="absolute bg-white h-4 w-full transform rotate-45"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        />
      </div>
    </motion.div>
  );

  const O = ({ shouldAnimate }: { shouldAnimate: boolean }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        shouldAnimate ? { opacity: 1, scale: [0, 1.2, 1] } : { opacity: 1 }
      }
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="border-[16px] border-white rounded-full w-4/5 h-4/5"></div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-black p-10 flex items-center justify-center">
      <div
        className="grid grid-cols-3 grid-rows-3 gap-4 relative m-4 sm:w-[24rem] sm:h-[24rem] lg:w-[30rem] lg:h-[30rem]"
        id="tic-tac-toe-board"
      >
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
            onClick={() => handleCellClick(index)}
          >
            {cell === "X" ? (
              <X shouldAnimate={animationTriggers[index]} />
            ) : null}
            {cell === "O" ? (
              <O shouldAnimate={animationTriggers[index]} />
            ) : null}
          </div>
        ))}
        {/* Vertical Lines */}
        <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-white"></div>
        <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-white"></div>
        {/* Horizontal Lines */}
        <div className="absolute top-1/3 left-0 right-0 h-1 bg-white"></div>
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-white"></div>
      </div>
    </div>
  );
};

export default Board;
