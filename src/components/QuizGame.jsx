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
        setTimeout(() => onClose(), 3000);
      }
    }, 1000);
  };

  if (quizCompleted) {
    return (
      <div className="text-center p-6 bg-[#f2f2f2] rounded-lg shadow-lg border border-[#1d2731] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#1d2731] hover:text-[#235789] transition-colors"
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col items-center justify-center gap-4">
          <FaSmile size={48} className="text-[#ffcb05]" />
          <h2 className="text-2xl font-bold text-[#1d2731]">Congratulations!</h2>
          <p className="text-[#235789] text-lg">You've completed the quiz.</p>
          <div className="flex items-center justify-center gap-2">
            <FaTrophy size={24} className="text-[#ffcb05]" />
            <p className="text-[#235789] text-lg">Final Score: {score}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-6 bg-[#f2f2f2] rounded-lg shadow-lg border border-[#1d2731] relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-[#1d2731] hover:text-[#235789] transition-colors"
      >
        <FaTimes size={24} />
      </button>
      <div className="flex items-center justify-center gap-2 mb-4">
        <FaGamepad size={32} className="text-[#235789]" />
        <h2 className="text-2xl font-bold text-[#1d2731]">Gaming Quiz</h2>
      </div>
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaTrophy size={24} className="text-[#ffcb05]" />
        <p className="text-[#235789] text-lg">Score: {score}</p>
      </div>
      <div className="bg-[#0b3c5d] p-6 rounded-lg border border-[#1d2731]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaQuestionCircle size={24} className="text-[#f2f2f2]" />
          <h3 className="text-xl font-bold text-[#f2f2f2]">
            {quizQuestions[currentQuestion].question}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`bg-[#f2f2f2] text-[#1d2731] px-4 py-3 rounded-lg hover:bg-[#235789] hover:text-[#f2f2f2] transition-colors border border-[#1d2731] ${
                selectedOption === option
                  ? option === quizQuestions[currentQuestion].answer
                    ? "bg-[#0b3c5d] border-[#235789] text-[#f2f2f2]"
                    : "bg-[#ffcb05] border-[#1d2731] text-[#1d2731]"
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