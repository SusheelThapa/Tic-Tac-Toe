import React, { useState } from "react";
import Header from "../components/Header";

const faq = [
  {
    question: "❓ What is Tic Tac Toe?",
    answer:
      "Tic Tac Toe is a classic two-player game where players take turns marking spaces in a 3×3 grid. The goal is to be the first to get three of your marks in a row, column, or diagonal. Players usually mark their spaces with either 'X' or 'O'.",
  },
  {
    question: "🕹️ How do you play Tic Tac Toe?",
    answer:
      "Players take turns placing their mark (either X or O) in an empty cell of a 3×3 grid. The game continues until one player has three marks in a row horizontally, vertically, or diagonally, or until all cells are filled and the game ends in a draw.",
  },
  {
    question: "🤔 Can Tic Tac Toe end in a draw?",
    answer:
      "Yes, Tic Tac Toe can end in a draw if all the cells are filled and neither player has achieved three marks in a row.",
  },
  {
    question: "💡 Is there a strategy to win Tic Tac Toe?",
    answer:
      "Yes, there are strategies to increase your chances of winning. For instance, placing your mark in the center cell first can give you a better chance of creating multiple opportunities to win. Blocking your opponent's moves and thinking ahead are also key strategies.",
  },
  {
    question: "✨ What are the main features of this Tic Tac Toe game?",
    answer:
      "This Tic Tac Toe game includes features such as single-player mode against an AI opponent, multiplayer mode, sound effects, game score tracking, and an interactive onboarding tutorial guided by Agent T.",
  },
  {
    question: "🧠 How does the AI opponent work?",
    answer:
      "The AI opponent, named Agent T., uses a basic algorithm to play against the player. It tries to win the game or block the player from winning by making strategic moves.",
  },
  {
    question: "🔇 Can I mute the game sounds?",
    answer:
      "Yes, there is a mute button that allows you to toggle the game sounds on or off.",
  },
  {
    question: "🔄 How do I restart the game?",
    answer:
      "You can restart the game by clicking the 'Restart' button that appears after the game ends or from the main menu.",
  },
  {
    question: "📖 What is the storyline of this Tic Tac Toe game?",
    answer:
      "In this game, you are guided by Agent T., a friendly AI character who helps you navigate and understand the features of the game. The storyline revolves around Agent T. guiding you through the basics, helping you learn strategies, and challenging you to improve your skills against a computer opponent.",
  },
  {
    question: "🤖 Who is Agent T.?",
    answer:
      "Agent T. is the AI character that acts as your guide and opponent in the game. The character adds a fun and engaging element to the game by providing tips, explaining game features, and competing against you in single-player mode.",
  },
  {
    question: "📈 Is there any narrative progression in the game?",
    answer:
      "While the primary focus is on playing Tic Tac Toe, the game includes a narrative element through the guidance of Agent T. This helps make the tutorial and overall gameplay more engaging.",
  },
  {
    question: "💻 What technologies are used to build this Tic Tac Toe game?",
    answer:
      "This Tic Tac Toe game is built using React for the front-end, with animations provided by Framer Motion and sounds managed by the use-sound library. Shepherd.js is used for the interactive onboarding tour.",
  },
  {
    question: "👩‍💻 How can I contribute to the development of this game?",
    answer:
      "You can contribute to the development by visiting our GitHub repository, where you can find the source code and project details. Feel free to fork the repository, make your changes, and submit a pull request.",
  },
  {
    question: "❓ Where can I find more information or get help with the game?",
    answer:
      "For more information or help, you can check the game's documentation on the GitHub repository or contact us through the provided support channels.",
  },
  {
    question: "🎮 What other games are similar to Tic Tac Toe?",
    answer:
      "Games similar to Tic Tac Toe include Connect Four, Gomoku, and Three Men's Morris. These games also involve strategy and grid-based play.",
  },
  {
    question: "🧩 Can Tic Tac Toe be expanded to larger grids?",
    answer:
      "Yes, Tic Tac Toe can be played on larger grids, such as 4x4 or 5x5. The objective remains the same, but the strategies and complexity increase.",
  },
  {
    question: "🏆 What is the history of Tic Tac Toe?",
    answer:
      "Tic Tac Toe dates back to ancient Egypt and was played in Rome as 'Terni Lapilli.' It has evolved over centuries and remains popular worldwide.",
  },
  {
    question: "🧮 How do you implement Tic Tac Toe in programming?",
    answer:
      "Implementing Tic Tac Toe involves creating a 3x3 grid, allowing player input, checking for win conditions, and alternating turns between players.",
  },
  {
    question: "📱 Can Tic Tac Toe be played on mobile devices?",
    answer:
      "Yes, Tic Tac Toe can be played on mobile devices through apps or mobile-friendly websites. The gameplay experience is similar to the desktop version.",
  },
  {
    question: "🎓 What skills can be learned from playing Tic Tac Toe?",
    answer:
      "Playing Tic Tac Toe can help develop strategic thinking, problem-solving, and planning skills. It's a simple yet effective way to improve cognitive abilities.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClick = (page: number) => {
    setCurrentPage(page);
    setActiveIndex(null); // Reset active index when changing page
  };

  const totalPages = Math.ceil(faq.length / itemsPerPage);
  const currentItems = faq.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <div className="mt-[2rem]">
        <div className="bg-black text-white p-8">
          <h1 className="text-4xl font-bold text-center mb-8 my-10">
            Frequently Asked Questions
          </h1>
          <div className="max-w-4xl mx-auto mt-10">
            {currentItems.map((item, index) => (
              <div key={index} className="mb-6">
                <div
                  className={`cursor-pointer p-3 rounded-md bg-gray-800 text-white my-8`}
                  onClick={() => toggleAnswer(index)}
                >
                  <h2 className="text-xl font-semibold">{item.question}</h2>
                </div>
                {activeIndex === index && (
                  <div className="mt-2 p-3 bg-gray-900 text-white rounded-md">
                    <p className="text-lg tracking-wider">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-center space-x-2 mt-16">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-white text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
