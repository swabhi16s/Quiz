import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data"); // Adjust URL as needed
        setQuizData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswer = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentIndex + 1 < quizData?.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      localStorage.setItem("latestScore", score);
      navigate("/results");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading quiz...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-96">
      <ProgressBar current={currentIndex + 1} total={quizData?.questions.length} />
      <Timer duration={quizData?.duration} onTimeout={() => handleAnswer(null, "")} />

      {quizData?.questions?.[currentIndex] && (
        <QuestionCard
          quizData={quizData}
          question={quizData.questions[currentIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Quiz;




