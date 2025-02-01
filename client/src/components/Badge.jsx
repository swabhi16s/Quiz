const Badge = ({ score }) => {
  let badgeText = " Keep Trying!";
  let badgeStyle = "bg-white-300 text-gray-800"; 

  if (score > 8) {
    badgeText = "🎖️ Quiz Master!";
    badgeStyle = "bg-yellow-500 text-white"; 
  } else if (score > 5) {
    badgeText = "🏅 Well Done!";
    badgeStyle = "bg-green-500 text-white"; 
  } else if (score > 3) {
    badgeText = "👍 Good Effort!";
    badgeStyle = "bg-blue-500 text-white"; 
  }

  return (
    <div
      className={`p-4 rounded-lg font-bold text-lg text-center ${badgeStyle} transition-all`}
    >
      {badgeText}
    </div>
  );
};

export default Badge;

  