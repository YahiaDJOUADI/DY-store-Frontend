"use client";
import { useState } from "react";
import { toast } from "sonner";
import { FaTimes, FaGamepad, FaTrophy, FaQuestionCircle, FaSmile } from "react-icons/fa";

const quizQuestions = [
  {
    question: "What is the best-selling video game of all time?",
    options: ["Tetris", "Minecraft", "GTA V", "Wii Sports"],
    answer: "Minecraft",
  },
  {
    question: "Which company developed the game 'Fortnite'?",
    options: ["EA", "Ubisoft", "Epic Games", "Activision"],
    answer: "Epic Games",
  },
  {
    question: "What is the main character's name in 'The Legend of Zelda' series?",
    options: ["Zelda", "Link", "Ganon", "Mario"],
    answer: "Link",
  },
  {
    question: "Which game is known for its battle royale mode?",
    options: ["Fortnite", "Call of Duty", "Apex Legends", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "What year was the first PlayStation released?",
    options: ["1992", "1994", "1996", "1998"],
    answer: "1994",
  },
];

export default function QuizGame({ onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Handle answer selection
  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === quizQuestions[currentQuestion].answer) {
      setScore((prev) => prev + 10);
      toast.success("Correct answer!");
    } else {
      toast.error("Wrong answer!");
    }
    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setQuizCompleted(true);
        toast.success("Quiz completed! Closing...");
        setTimeout(() => onClose(), 3000); // Close modal after 3 seconds
      }
    }, 1000);
  };

  if (quizCompleted) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all"
        >
          <FaTimes size={24} />
        </button>

        {/* Completion Message */}
        <div className="flex flex-col items-center justify-center gap-4">
          <FaSmile size={48} className="text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
          <p className="text-gray-700 text-lg">You've completed the quiz.</p>
          <div className="flex items-center justify-center gap-2">
            <FaTrophy size={24} className="text-yellow-500" />
            <p className="text-gray-700 text-lg">Final Score: {score}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all"
      >
        <FaTimes size={24} />
      </button>

      {/* Quiz Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <FaGamepad size={32} className="text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">Gaming Quiz</h2>
      </div>

      {/* Score Display */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaTrophy size={24} className="text-yellow-500" />
        <p className="text-gray-700 text-lg">Score: {score}</p>
      </div>

      {/* Question Card */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaQuestionCircle size={24} className="text-blue-500" />
          <h3 className="text-xl font-bold text-gray-800">
            {quizQuestions[currentQuestion].question}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`bg-white text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all border border-gray-200 ${
                selectedOption === option
                  ? option === quizQuestions[currentQuestion].answer
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}