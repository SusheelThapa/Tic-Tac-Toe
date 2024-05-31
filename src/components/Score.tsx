const Score = () => {
  return (
    <div className="flex justify-center items-center gap-20 text-lg tracking-wider">
      <div className="text-center">
        <div>PLAYER(X)</div>
        <div className="text-5xl">0</div>
      </div>
      <div className="text-center">
        <div>TIE</div>
        <div className="text-5xl">0</div>
      </div>
      <div className="text-center">
        <div>COMPUTER(O)</div>
        <div className="text-5xl">2</div>
      </div>
    </div>
  );
};

export default Score;
