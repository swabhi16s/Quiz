import { useState, useEffect } from "react";

const QuestionCard = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [question]);

  if (!question) return <p className="text-center text-black-600">No question available.</p>;

  const handleAnswer = (selectedAnswer) => {
    setSelected(selectedAnswer);
    setTimeout(() => {
      onAnswer(selectedAnswer);
    }, 500);
  };

  return (
    <div className="h-[400px] p-6 bg-green-100 rounded-lg shadow-lg text-center border-1 border-green-400 flex flex-col">
      <h3 className="text-lg font-bold text-green-900 mb-4 line-clamp-2">
        🧬 {question?.description || "No question available."}
      </h3>

      <div className="flex-1 ">
        <div className="flex flex-col gap-3">
          {question?.options?.map((option) => (
            <button
              key={option.id}
              className={`p-3 border-2 rounded-lg transition duration-300 w-full text-lg font-medium shadow-md
                ${
                  selected === option.description
                    ? option.is_correct
                      ? "bg-gray-500 text-white border-gray-200"
                      : "bg-gray-500 text-white border-gray-200"
                    : "bg-gray-100 hover:bg-gray-200"
                } transform hover:scale-110`}
              onClick={() => handleAnswer(option.description)}
              disabled={selected !== null} 
              aria-pressed={selected === option.description} 
            >
              {option.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;


