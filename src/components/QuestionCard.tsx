//Types
import { AnswerObject } from "../App";


type QuestionCardProps = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject  | undefined;
    questionNr: number;
    totalQuestions: number;
}

export const QuestionCard = ({question,answers,callback,userAnswer,questionNr,totalQuestions} : QuestionCardProps) => {
    return(
        <div className="m-2 pb-2 bg-green-400 rounded-lg">
        <p dangerouslySetInnerHTML={{__html: question}} className="font-bold mx-1 py-2"/>
        <p className="mx-1 bg-slate-200 w-32 text-center px-1 rounded-lg">
         Question: {questionNr}/{totalQuestions}
        </p>
        <div className="mx-1">
            {answers.map(answer => (
              <div key={answer} className="my-1">
                  <button disabled={userAnswer ? true : false} value={answer} onClick={callback} className="bg-slate-200 w-full my-1 py-1 rounded-lg">
                   <span dangerouslySetInnerHTML={{__html: answer}} />
                  </button>
              </div>   
            ))}
        </div>
        </div>
    )
}
// my-2 bg-slate-200 w-auto text-center px-1 rounded-lg