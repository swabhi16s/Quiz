import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import Badge from "../components/Badge";
import Button from "../components/Button";

const Result = () => {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const latestScore = parseInt(localStorage.getItem("latestScore")) || 0;
    setScore(latestScore);

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const newEntry = { name: "Player", score: latestScore };
    localStorage.setItem("leaderboard", JSON.stringify([...leaderboard, newEntry]));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-96 text-center">
      <h1 className="text-2xl font-bold">🎉 Quiz Completed!</h1>
      <p className="mt-2 text-gray-700">Your Score: <strong>{score} pts</strong></p>
      <Badge score={score} />
      <Leaderboard />
      <div className="mt-4 flex gap-2">
        <Button text="Retry Quiz" onClick={() => navigate("/quiz")} />
        <Button text="Home" onClick={() => navigate("/")} variant="secondary" />
      </div>
    </div>
  );
};

export default Result;
