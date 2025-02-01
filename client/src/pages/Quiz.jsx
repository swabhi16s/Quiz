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
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data");
        setQuizData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (quizData) {
      localStorage.setItem("quizData", JSON.stringify(quizData));
      localStorage.setItem("totalQuestions", quizData.questions.length);
    }
  }, [quizData]);

  const handleAnswer = (selectedAnswer) => {
    if (!quizData) return;

    const question = quizData.questions[currentIndex];
    const selectedOption = question?.options?.find((option) => option.description === selectedAnswer);

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: selectedOption?.description,
    }));
    goToNextQuestion();
  };

  const calculateScore = () => {
    return Object.values(selectedAnswers).filter(
      (answer, index) => quizData?.questions[index]?.options?.find((option) => option.description === answer)?.is_correct
    ).length;
  };

  const goToNextQuestion = () => {
    if (currentIndex + 1 < quizData?.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setResetTimer((prev) => !prev);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setResetTimer((prev) => !prev);
    }
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    console.log("Final Score:", finalScore);
    localStorage.setItem("latestScore", finalScore);
    localStorage.setItem("correctAnswers", finalScore);
    localStorage.setItem("userAnswers", JSON.stringify(selectedAnswers)); 
    
    navigate("/results");
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 bg-white rounded-3xl shadow-2xl w-full h-full border-1 border-green-500 ">
        <ProgressBar current={currentIndex + 1} total={quizData?.questions.length} />
        <Timer duration={120} onTimeout={goToNextQuestion} key={resetTimer} />

        {quizData?.questions?.[currentIndex] && (
          <QuestionCard
            question={quizData.questions[currentIndex]}
            onAnswer={handleAnswer}
            selected={selectedAnswers[currentIndex] ? "selected" : null}
          />
        )}

        <div className="flex justify-between mt-6">
          <button
            className="px-5 py-3 bg-yellow-500 text-white font-bold rounded-xl shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-110"
            onClick={goToPreviousQuestion}
            disabled={currentIndex === 0}
          >
            🔙 Previous
          </button>

          {currentIndex + 1 === quizData?.questions.length ? (
            <button
              className="px-5 py-3 bg-red-500 text-white font-bold rounded-xl shadow-md hover:bg-red-600 transition-transform transform hover:scale-110"
              onClick={handleSubmit}
            >
              ✅ Submit
            </button>
          ) : (
            <button
              className="px-5 py-3 bg-green-500 text-white font-bold rounded-xl shadow-md hover:bg-green-600 transition-transform transform hover:scale-110"
              onClick={goToNextQuestion}
            >
              Next 🔜
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;





















