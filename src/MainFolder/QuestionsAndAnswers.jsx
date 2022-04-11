import Questions from "../jsonData/question";
import store from "../redux/CenterState";
import {useEffect, useState} from "react";
import axios from "axios";

const QuestionsAndAnswers=(props)=>{
    const [currentQuestion,setcurrentQuestion]=useState(null);
    const [Questions,setQuestions]=useState(null);
    const [examName,setExamName]=useState(store.getState().selectedExamAdmin);
    const [subject,setSubject]=useState(store.getState().selectedSubjectAdmin);
    if(Questions !== null){
        store.subscribe(()=>{
            const currentQuestion=Questions.filter((item)=>{
                 if(item.qid === store.getState().cq){
                     return item;
                 }
            })
            setcurrentQuestion(currentQuestion[0])
        })
    }
    const isSelectedOptionCorrect=(index,answer)=>{
         if(answer === currentQuestion.options[index-1]){
              currentQuestion.isCorrect=1;
              currentQuestion.state[index-1]=1;
         }else{
                for(let i=0;i<currentQuestion.options.length;i++){
                    if(currentQuestion.options[i] === answer){
                      currentQuestion.state[i]=1;
                    }else{
                       currentQuestion.state[i]=2;
                    }
                }
                currentQuestion.state[index-1]=2;
                currentQuestion.isCorrect=2;
         }
         setcurrentQuestion(currentQuestion);
         store.dispatch({
            type:"UPDATE_STATE",
            updateState:!store.getState().updateUi
        })
    }
    useEffect(()=>{
         const updatedData=props.questionAndAnsersOptions.map((question,index)=>{
                question.isCorrect=0;
                let states=[];
                for(let i=0;i<question.options.length;i++){
                    states.push(0);
                }
                question.qid=index+1;
                question.state=states;
                return question;
         })
         setQuestions(updatedData);
         setcurrentQuestion(updatedData[0]);
    },[])
    const answerCorrectCss={backgroundColor: "rgb(14,206,109)"};
    const wrongAnswer={backgroundColor:"red"};
    const defaultColor={backgroundColor:"#222"};
    return(
        <div className="mcq-question-options">
            {currentQuestion === null ? <h2 style={{textAlign:"center",color:"white"}}>DATA IS LAODING.....</h2>:
            <>
                <div className="mcq-qusetion">
                    <h4>{currentQuestion.question}</h4>
                </div>
                <div className="options">
                    <ul>
                        {
                             currentQuestion.options.map((option,index)=>{
                                return  <li 
                                              key={index} 
                                              onClick={()=>isSelectedOptionCorrect(index+1,currentQuestion.answer)}
                                              style={currentQuestion.state[index] === 1 ? answerCorrectCss : currentQuestion.state[index] === 2 ? wrongAnswer:defaultColor}
                                            >
                                            {option}
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </>
            }
        </div>
    )
}
export default QuestionsAndAnswers;