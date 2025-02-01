import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

const Result = () => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizData, setQuizData] = useState({});
  const [showSummary, setShowSummary] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuizData = JSON.parse(localStorage.getItem("quizData"));
    const storedCorrectAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;
    const storedTotalQuestions = storedQuizData?.questions?.length || 0;
    const storedUserAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};

    setTotalQuestions(storedTotalQuestions);
    setCorrectAnswers(storedCorrectAnswers);
    setIncorrectAnswers(storedTotalQuestions - storedCorrectAnswers);
    setUserAnswers(storedUserAnswers);
    setQuizData(storedQuizData);
    setScore(storedCorrectAnswers); 
  }, []);

  const percentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;

  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Answers",
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="p-8 bg-white rounded-3xl shadow-2xl w-full h-full border-8 border-green-500 max-w-4xl">
        <h1 className="text-4xl font-bold text-green-600 text-center md:text-left">
          🎉 Quiz Completed!
        </h1>
        <div className="mt-4 text-lg text-gray-700">
          <div className="mt-2">
            <strong className="text-green-500">Your Score: </strong>
            <span className="text-2xl">{score} pts</span>
          </div>
          <div className="mt-2">
            <strong className="text-green-500">Correct Answers: </strong>
            <span>{correctAnswers}</span>
          </div>
          <div className="mt-2">
            <strong className="text-red-500">Incorrect Answers: </strong>
            <span>{incorrectAnswers}</span>
          </div>
          <div className="mt-2">
            <strong>Total Questions: </strong>
            <span>{totalQuestions}</span>
          </div>
          <div className="mt-2">
            <strong className="text-green-600">Your Percentage: </strong>
            <span>{percentage}%</span>
          </div>
        </div>

        <Badge score={score} />

        <div className="mt-6">
          <Bar data={data} options={options} />
        </div>

        <div className="mt-6 flex justify-between gap-4 flex-col sm:flex-row">
          <Button
            text={showSummary ? "Hide Summary" : "Show Summary"}
            onClick={() => setShowSummary((prevState) => !prevState)}
            className="px-5 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all w-full sm:w-auto"
          />
          <Button
            text="Retry Quiz"
            onClick={() => navigate("/quiz")}
            className="px-5 py-3 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 transition-all w-full sm:w-auto"
          />
        </div>

        {showSummary && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quiz Summary</h2>
            {quizData?.questions?.map((question, index) => {
              const userAnswer = userAnswers[index];
              const correctAnswer = question?.options?.find((option) => option.is_correct)?.description;

              return (
                <div
                  key={index}
                  className="p-6 bg-green-100 rounded-lg shadow-lg mb-4 text-center border-4 border-green-400"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    <strong>Q{index + 1}: </strong>{question?.description}
                  </p>
                  <div className="mt-4">
                    <p className="font-medium text-gray-800">
                      <strong>Your Answer: </strong>
                      <span className={userAnswer === correctAnswer ? "text-green-600" : "text-red-600"}>
                        {userAnswer}
                      </span>
                    </p>
                    <p className="font-medium text-gray-800">
                      <strong>Correct Answer: </strong>
                      <span className="text-green-600">{correctAnswer}</span>
                    </p>
                  </div>
                  <p
                    className={userAnswer === correctAnswer ? "text-green-600 mt-4" : "text-red-600 mt-4"}
                  >
                    {userAnswer === correctAnswer ? "✅ Correct!" : "❌ Incorrect"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;



