import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/results" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

