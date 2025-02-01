import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <div className="min-h-screen flex justify-center items-center bg-green-100 "
      style={{ backgroundImage: 'url("https://thumbs.dreamstime.com/b/dna-molecule-green-background-vector-illustration-unfolding-dna-molecule-green-background-vector-illustration-vector-122815106.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Result />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

