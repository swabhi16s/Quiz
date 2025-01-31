import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setScores(storedScores.sort((a, b) => b.score - a.score).slice(0, 5)); // Show top 5
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">🏆 Leaderboard</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={index} className="text-lg">
            {index + 1}. {entry.name} - {entry.score} pts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
