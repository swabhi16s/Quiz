import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex justify-center items-center">
<div className="text-center p-6 bg-white rounded-3xl shadow-lg w-full sm:w-[500px] md:w-[600px] lg:w-[700px] transform transition-all duration-300 hover:scale-105">

       
        <h1 className="text-3xl font-bold text-green-600 mb-4 animate-pulse">
          🎯 Welcome to the Quiz!
        </h1>
        <p className="mt-2 text-gray-600 mb-6 text-lg">
          Test your knowledge and earn badges!
        </p>
        
       
        <Button 
          text="Start Quiz" 
          onClick={() => navigate("/quiz")} 
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Home;

