import style from "./AddMcqTest.module.css";
import {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "../../redux/CenterState";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddMcqTest=()=>{
    let navigate=useNavigate();
    const [examName,setExamName]=useState(store.getState().selectedExamAdmin);
    const [subject,setSubject]=useState(store.getState().selectedSubjectAdmin);
    const [allQuestions,setAllQuestions]=useState([1]);
    const [addOptions,setAllOddOptions]=useState([[1,2]]);
    const [questionAndAnswer,setQuestionAndAnswer]=useState([{question:"",answer:"",options:["",""]}]);
    const [isAllInputValid,setIsAllInoutValid]=useState(false);
    const removeMcq=()=>{
         if(allQuestions.length !== 1){
              const newUpdateArray=[...allQuestions];
              newUpdateArray.pop();
              setAllQuestions(newUpdateArray);
              const updatedOption=[...addOptions];
              updatedOption.pop();
              setAllOddOptions(updatedOption);
              const questionAndAnswerUpdatedArray=[...questionAndAnswer];
              questionAndAnswerUpdatedArray.pop();
              setQuestionAndAnswer(questionAndAnswerUpdatedArray);
         }
    }
    const addMcq=()=>{
        setAllQuestions([...allQuestions,allQuestions.length+1]);
        setAllOddOptions([...addOptions,[1,2]]);
        setQuestionAndAnswer([...questionAndAnswer,{question:"",answer:"",options:["",""]}]);
    }
    const addRemoveOption=(addOrRemove,questionNumber)=>{
          if(addOrRemove === 1 && (addOptions[questionNumber].length !== 5)){
                {
                    let array=[...addOptions[questionNumber]];
                    array=[...array,array.length+1];
                    const newArray=addOptions.map((question,index)=>{
                           if(index === questionNumber){
                                question=array;
                           }
                           return question;
                    })
                    let updatedQuestionOption=[...questionAndAnswer[questionNumber].options];
                    updatedQuestionOption=[...updatedQuestionOption,""];
                    let newUpdatedQuestionOption=questionAndAnswer.map((question,index)=>{
                          if(index === questionNumber){
                                question.options=updatedQuestionOption;
                          }
                          return question;
                    })
                    setQuestionAndAnswer(newUpdatedQuestionOption);
                    setAllOddOptions(newArray);
                }
          }else{
              if(addOrRemove === -1 && addOptions[questionNumber].length !== 2){
                   let array=[...addOptions[questionNumber]];
                   array.pop();
                   const newArray=addOptions.map((question,index)=>{
                      if(index === questionNumber){
                         question=array;
                      }
                      return question;
                   })
                   let updatedQuestionOption=[...questionAndAnswer[questionNumber].options];
                   updatedQuestionOption.pop();
                   let newUpdatedQuestionOption=questionAndAnswer.map((question,index)=>{
                        if(index === questionNumber){
                            question.options=updatedQuestionOption;
                        }
                        return question;
                   })
                   setQuestionAndAnswer(newUpdatedQuestionOption);
                   setAllOddOptions(newArray)
              }
          }
    }
    //slider
    const settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        swipeToSlide:true,
        slidesToScroll: 1
    }
    const getOptionsValue=(questionNumber,currentOption,e)=>{
         {
            const updatedOutput=questionAndAnswer.map((question,index)=>{
                   if(index === questionNumber){
                       question.options[currentOption]=e.target.value.trim();
                   }
                   return question;
            })
            setQuestionAndAnswer(updatedOutput)
         }
    }
    const getCorrectAnswer=(answer,currentQuestion)=>{
         let correcctAnswer=answer.trim();
         const updatedQuestionAndAnswer=questionAndAnswer.map((questionAndAnswer,index)=>{
              if(index === currentQuestion){
                  questionAndAnswer.answer=correcctAnswer;
              }
              return questionAndAnswer;
         })
         setQuestionAndAnswer(updatedQuestionAndAnswer);
    }
    const getQuestion=(e,currentQuestion)=>{
         let question=e.target.value.trim();
         const updatedQuestionAndAnswer=questionAndAnswer.map((questionAndAnswer,index)=>{
            if(index === currentQuestion){
                questionAndAnswer.question=question;
            }
            return questionAndAnswer;
        })
        setQuestionAndAnswer(updatedQuestionAndAnswer);
    }
    const addDataIntoDatabase=()=>{
        let flag=false;
        for(let i=0;i<questionAndAnswer.length;i++){
             if(questionAndAnswer[i].question === "" || questionAndAnswer[i].answer === ""){
                 flag=true;
                 setIsAllInoutValid(true);
                 break;
             }
             for(let j=0;j<questionAndAnswer[i].options.length;j++){
                  if(questionAndAnswer[i].options[j] === ""){
                      flag=true;
                      setIsAllInoutValid(true);
                      break;
                  }
             }
        }
        if(flag == false){
            setIsAllInoutValid(false);
            axios.post("https://mcq-api-react-express.herokuapp.com/add-question",{examName:examName,examSubject:subject,questionAndAnswer:questionAndAnswer})
            .then((result)=>{
                alert("data inserted successfully");
                console.log(result);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    useEffect(()=>{
        if(examName === "" || subject === "" || examName === undefined || subject === undefined){
            navigate("/admin/select-exam-subject");
        }
        console.log(store.getState().selectedExamAdmin,store.getState().selectedSubjectAdmin);
    },[])
    return(
        <div className={style.addMcqTest}>
            <div className={style.allInput}>
                <Slider {...settings}>
                    {
                        allQuestions.map((question,index)=>{
                            return  <div  key={index} className={style.inputFileWrapper}>
                                         <input type="text" placeholder={`enter question ${question}`} required  className={style.question} onChange={(e)=>getQuestion(e,index)}/>
                                         <div className={style.options}>
                                               <ul>
                                                    {
                                                        addOptions[index].map((option,index1)=>{
                                                            return <li key={option}><input disabled={questionAndAnswer[index].options[index1] === ""?true:false} type="radio" onChange={()=>getCorrectAnswer(questionAndAnswer[index].options[index1],index)} name={question}/><input onChange={(e)=>getOptionsValue(index,option-1,e)} type="text" placeholder={"enter option "+(option)}/></li>
                                                        })
                                                    }
                                               </ul>
                                               {isAllInputValid && <h5 style={{color:"red",fontWeight:"bolder",position:"relative",top:"15px"}}>{"all fields can't be empty"}</h5>}
                                         </div><br/>
                                         <div className={style.btnWrapper}>
                                              <button onClick={()=>addRemoveOption(-1,index)} style={{backgroundColor:"red"}}>remove option</button>
                                              <button onClick={()=>addRemoveOption(1,index)} style={{backgroundColor:"green"}}>add option</button>
                                         </div>
                                    </div>
                        })
                    }
                </Slider>
            </div>
            <div className={style.btnWrapper}>
                <button type="button" onClick={()=>removeMcq()} style={{backgroundColor:"#880808"}}>remove question</button>
                <button type="button" onClick={()=>addMcq()} style={{backgroundColor:"#6495ED"}}>add question</button><br/>
                <button type="button" onClick={(e)=>addDataIntoDatabase(e)} style={{backgroundColor:"#FF00FF"}}>add mcq</button>
            </div>
        </div>
    )
}
export default AddMcqTest;