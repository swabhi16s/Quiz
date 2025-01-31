import { useState, useEffect } from "react";

const Timer = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  return (
    <div className="text-lg font-bold text-center text-red-500">
      ⏳ Time Left: {timeLeft}s
    </div>
  );
};

export default Timer;
