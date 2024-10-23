import React from "react";
import { FaRegCircle, FaTimes, FaRegSmile } from "react-icons/fa";
import { LogItem } from "../types/types";

interface GameLogProps {
  logs: LogItem[];
}

const GameLog: React.FC<GameLogProps> = ({ logs }) => {
  return (
    <div className="bg-black p-6 shadow-lg rounded-lg max-w-md w-full mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">Game Log</h2>
      <ul className="space-y-4">
        {logs.map((log, index) => (
          <li key={index} className="flex items-center space-x-4">
            {log.type === "move" && log.player && (
              <span className="text-2xl text-blue-500">
                {log.player === "X" ? <FaTimes /> : <FaRegCircle />}
              </span>
            )}
            {log.type === "status" && (
              <span className="text-2xl text-green-500">
                <FaRegSmile />
              </span>
            )}

            <div className="flex-1 text-white">
              {log.type === "move" && log.player && log.position
                ? `${log.player} played on ${log.position}`
                : log.message}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameLog;
