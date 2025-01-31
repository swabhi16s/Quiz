const Button = ({ text, onClick, variant = "primary" }) => {
    const styles = {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-300 text-black hover:bg-gray-400",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };
  
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg ${styles[variant]}`}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  