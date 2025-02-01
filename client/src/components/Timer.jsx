import { useEffect, useState } from "react";

const Timer = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  return (
    <div className="text-center text-red-700 font-bold mb-4 bg-yellow-300 py-2 rounded-lg shadow-md  transform hover:scale-105 transition">
      ⚠️  Timer: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;

