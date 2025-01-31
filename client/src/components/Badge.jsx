const Badge = ({ score }) => {
    let badgeText = "😐 Keep Trying!";
    if (score > 80) badgeText = "🎖️ Quiz Master!";
    else if (score > 50) badgeText = "🏅 Well Done!";
    else if (score > 30) badgeText = "👍 Good Effort!";
  
    return <div className="text-lg font-bold text-blue-500">{badgeText}</div>;
  };
  
  export default Badge;
  