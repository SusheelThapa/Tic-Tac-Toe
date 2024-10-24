import { motion } from "framer-motion";

interface Props {
  board: string[];
  handleCellClick: (index: number) => void;
  animationTriggers: boolean[];
}

/**
 * Board component for rendering the Tic-Tac-Toe grid and handling animations.
 * 
 * @component
 * @param {string[]} board - The current state of the game board, an array of 'X', 'O', or empty strings.
 * @param {(index: number) => void} handleCellClick - Function to handle clicks on board cells.
 * @param {boolean[]} animationTriggers - Array indicating which cells should trigger animations.
 * @returns {JSX.Element} - Returns the rendered Tic-Tac-Toe board component.
 */
const Board = ({ board, handleCellClick, animationTriggers }: Props) => {

  /**
   * Component to render the "X" symbol with optional animation.
   * 
   * @param {boolean} shouldAnimate - Whether to animate the "X" symbol on render.
   * @returns {JSX.Element} - Returns the "X" symbol component.
   */
  const X = ({ shouldAnimate }: { shouldAnimate: boolean }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1, scale: [0, 1.2, 1] } : { opacity: 1 }}
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

  /**
   * Component to render the "O" symbol with optional animation.
   * 
   * @param {boolean} shouldAnimate - Whether to animate the "O" symbol on render.
   * @returns {JSX.Element} - Returns the "O" symbol component.
   */
  const O = ({ shouldAnimate }: { shouldAnimate: boolean }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1, scale: [0, 1.2, 1] } : { opacity: 1 }}
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
            {cell === "X" ? <X shouldAnimate={animationTriggers[index]} /> : null}
            {cell === "O" ? <O shouldAnimate={animationTriggers[index]} /> : null}
          </div>
        ))}

        {/* Vertical Lines */}
        <div className="absolute left-1/3 top-4 bottom-4 w-1 bg-white"></div>
        <div className="absolute left-2/3 top-4 bottom-4 w-1 bg-white"></div>
        {/* Horizontal Lines */}
        <div className="absolute top-1/3 left-4 right-4 h-1 bg-white"></div>
        <div className="absolute top-2/3 left-4 right-4 h-1 bg-white"></div>
      </div>
    </div>
  );
};

export default Board;
