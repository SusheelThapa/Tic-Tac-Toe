interface Props {
  playerWins: number;
  computerWins: number;
  ties: number;
}

const Score = ({ playerWins, computerWins, ties }: Props) => {
  return (
    <div className="flex justify-center items-center gap-20 text-lg tracking-wider">
      <div className="text-center">
        <div>PLAYER(X)</div>
        <div className="text-5xl">{playerWins}</div>
      </div>
      <div className="text-center">
        <div>TIE</div>
        <div className="text-5xl">{ties}</div>
      </div>
      <div className="text-center">
        <div>COMPUTER(O)</div>
        <div className="text-5xl">{computerWins}</div>
      </div>
    </div>
  );
};

export default Score;
