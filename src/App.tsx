//import './App.css'
import { useState } from "react";
import { fetchQuizQuestions } from "./API";
import { QuestionCard } from "./components/QuestionCard";
import { QuestionState, Difficulty } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading ,setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Users answer
      const answer = e.currentTarget.value;
      //Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct
      if(correct) setScore(prev => prev + 1);
      //Save answer in the array for user answers
      const answerObject = {
       question: questions,
       answer,
       correct,
       correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    //Move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }

  }

  return (
    <div className="">
     <h1 className="text-center font-bold text-xl mb-2 py-2 bg-green-600 text-slate-200">Quiz App</h1>
     {!gameOver ? <div className='mx-2 bg-green-300 w-20 text-center rounded-lg font-bold'>Score: {score}</div> : null}
     {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="flex mx-auto my-4 px-3 bg-green-300 p-1 rounded-lg font-bold" onClick={startTrivia}>Start</button>
     ) : null}
     {loading ? <p className="text-center">Loading Questions ...</p> : null} 
     {!loading && !gameOver && (
       <QuestionCard
       questionNr={number + 1}
       totalQuestions={TOTAL_QUESTIONS}
       question={questions[number].question}
       answers={questions[number].answers}
       userAnswer={userAnswers ? userAnswers[number] : undefined}
       callback={checkAnswer}
      />  
     )} 
     {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <div className="flex">
           <button className="mx-auto py-1 bg-green-300 w-32 text-center rounded-lg font-bold" onClick={nextQuestion}>Next Question</button>
        </div>
     ) : null}
      {/* {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="flex mx-auto my-4 px-3 bg-green-300 p-1 rounded-lg text-gray-600" onClick={startTrivia}>Start</button>
     ) : null} */}
   
    </div>
  )
}

export default App
