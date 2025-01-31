import { useState } from "react";

const QuestionCard = ({ quizData, question, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  if (!question) {
    return <p>No question available</p>; // Handle case when question is undefined or missing
  }

  // Handle answer selection and update score
  const handleAnswer = (selectedAnswer, correctAnswer) => {
    setSelected(selectedAnswer);
    if (selectedAnswer === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    onAnswer(selectedAnswer, correctAnswer); // Notify parent component
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      {/* Quiz Title and Meta Data */}
      <h2 className="text-2xl font-semibold">{quizData?.title || "Untitled Quiz"}</h2>
      <p><strong>Topic:</strong> {quizData?.topic}</p>
      <p><strong>Duration:</strong> {quizData?.duration} minutes</p>
      <p><strong>End Time:</strong> {new Date(quizData?.end_time).toLocaleString()}</p>
      <p><strong>Negative Marks:</strong> {quizData?.negative_marks}</p>
      <p><strong>Correct Answer Marks:</strong> {quizData?.correct_answer_marks}</p>
      <p><strong>Questions Count:</strong> {quizData?.questions_count}</p>
      <p><strong>Max Mistakes Allowed:</strong> {quizData?.max_mistake_count}</p>
      <p><strong>End Date:</strong> {new Date(quizData?.ends_at).toLocaleString()}</p>
      <p><strong>Lives:</strong> {quizData?.live_count}</p>
      <p><strong>Reading Materials:</strong> {quizData?.reading_materials?.length > 0 ? quizData.reading_materials.join(", ") : "None"}</p>

      {/* Question and Options */}
      <div className="mt-6">
        <h3 className="text-lg font-medium">Question: {question?.description}</h3>
        <div className="options mt-4">
          {question?.options?.length > 0 ? (
            question.options.map((option) => (
              <button
                key={option.id}
                className={`p-2 border rounded-lg mb-2 w-full ${
                  selected === option.description
                    ? option.is_correct
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleAnswer(option.description, question.correct_answer)}
                disabled={selected !== null} // Disable options after an answer is selected
              >
                {option.description}
              </button>
            ))
          ) : (
            <p>No options available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;








