interface Props {
  playerWins: number;
  computerWins: number;
  ties: number;
}

const Score = ({ playerWins, computerWins, ties }: Props) => {
  return (
    <div className="w-full text-lg tracking-wider flex flex-col sm:flex-row justify-center items-center">
      <div
        id="game-score"
        className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-20 w-full sm:w-8/12 lg:w-6/12"
      >
        <div className="text-center" id="player-won-score">
          <div>PLAYER(X)</div>
          <div className="text-3xl sm:text-5xl">{playerWins}</div>
        </div>
        <div className="text-center" id="game-tie-score">
          <div>TIE</div>
          <div className="text-3xl sm:text-5xl">{ties}</div>
        </div>
        <div className="text-center" id="computer-won-score">
          <div>Agent T.(O)</div>
          <div className="text-3xl sm:text-5xl">{computerWins}</div>
        </div>
      </div>
    </div>
  );
};

export default Score;
