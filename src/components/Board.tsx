

interface Props {
  board: string[];
  handleCellClick: (index: number) => void;
}
const Board = ({ board, handleCellClick }: Props) => {
  // Component for "X"
  const X = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute bg-white h-4 w-full transform -rotate-45"
        style={{ top: "50%" }}
      ></div>
      <div
        className="absolute bg-white h-4 w-full transform rotate-45"
        style={{ top: "50%" }}
      ></div>
    </div>
  );

  // Component for "O"
  const O = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="border-[16px] border-white rounded-full w-4/5 h-4/5"></div>
    </div>
  );

  return (
    <div className="bg-black p-10 flex items-center justify-center">
      <div
        className="grid grid-cols-3 grid-rows-3 gap-4 relative"
        style={{ width: "36rem", height: "36rem" }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
            onClick={() => handleCellClick(index)}
          >
            {cell === "X" ? <X /> : cell === "O" ? <O /> : null}
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
