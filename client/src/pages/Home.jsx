import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-lg w-96">
      <h1 className="text-2xl font-bold">🎯 Welcome to the Quiz!</h1>
      <p className="mt-2 text-gray-600">Test your knowledge and earn badges!</p>
      <Button text="Start Quiz" onClick={() => navigate("/quiz")} />
    </div>
  );
};

export default Home;
