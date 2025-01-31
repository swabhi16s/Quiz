const ProgressBar = ({ current, total }) => {
    const percentage = (current / total) * 100;
  
    return (
      <div className="w-full bg-gray-300 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };
  
  export default ProgressBar;
  