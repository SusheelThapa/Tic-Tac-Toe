interface Props {
  playerOneName: string;
  playerTwoName: string;
  playerOneWins: number;
  playerTwoWins: number;
  ties: number;
}

const Score = ({
  playerOneName,
  playerTwoName,
  playerOneWins,
  playerTwoWins,
  ties,
}: Props) => {
  return (
    <div className="w-full text-lg tracking-wider flex flex-col sm:flex-row justify-center items-center">
      <div
        id="game-score"
        className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-20 w-full sm:w-8/12 lg:w-6/12"
      >
        {/* Player One Score */}
        <div className="text-center" id="player-one-won-score">
          <div>{playerOneName.toUpperCase()}(X)</div>
          <div className="text-3xl sm:text-5xl">{playerOneWins}</div>
        </div>

        {/* Tie Score */}
        <div className="text-center" id="game-tie-score">
          <div>TIE</div>
          <div className="text-3xl sm:text-5xl">{ties}</div>
        </div>

        {/* Player Two or Computer Score */}
        <div className="text-center" id="player-two-won-score">
          <div>{playerTwoName.toUpperCase()}(O)</div>
          <div className="text-3xl sm:text-5xl">{playerTwoWins}</div>
        </div>
      </div>
    </div>
  );
};

export default Score;
