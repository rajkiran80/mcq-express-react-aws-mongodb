import style from "./SelectExamAndSubject.module.css";
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import store from "../../redux/CenterState";
import axios from "axios";

const AddMcqTest=()=>{
    let navigate=useNavigate();
    const[selectedExam,setSelectedExam]=useState("");
    const[selectedSubject,setSelectedSubject]=useState("");
    const[exams,setExams]=useState([]);
    const[subjects,setSubjects]=useState(null);
    const goAndAddMcq=()=>{
         if(selectedExam !== "" && selectedSubject !== ""){
             store.dispatch({
                 type:"SELECT_EXAM_SUBJECT",
                 selectedexam:selectedExam,
                 selectedsubject:selectedSubject
             })
             navigate("/admin/generate-new-mcq");
         }
    }
    useEffect(()=>{
         axios.get("https://mcq-api-react-express.herokuapp.com/fetch-exams-subjects")
         .then((results)=>{
              let examsList=[];
              let subjectsMap=new Map();
              results.data.forEach((exam)=>{
                   examsList.push(exam.examName);
                   subjectsMap.set(exam.examName,exam.respectiveSubjects);
              })
              setExams(examsList);
              setSubjects(subjectsMap);
              setSelectedExam(examsList[0]);
         })
         .catch((err)=>{
              console.log(err)
         })
    },[])
    return(
        <div className={style.addMcqTestContainer}>
            {    
                exams.length === 0 ?  <h2 style={{textAlign:"center",color:"white"}}>DATA IS LOADING.....</h2> :
                <div className={style.selectExamSubject}>
                    <h4>SELECT EXAM</h4>
                    <div>
                        <select onChange={(e)=>setSelectedExam(e.target.value)}>
                            {
                                exams.map((exam,index)=>{
                                    return <option value={exam} key={index}>{exam}</option>
                                })
                            }
                        </select>
                    </div>
                    <h4>SELECT SUBJECT</h4>
                    <div>
                        {
                            selectedExam === "" ?  <h2 style={{textAlign:"center",color:"white"}}>DATA IS LOADING.....</h2> :
                            <select onChange={(e)=>setSelectedSubject(e.target.value)}>
                                    {
                                        subjects.get(selectedExam).map((subject,index)=>{
                                            return <option value={subject} key={index}>{subject}</option>
                                        })
                                    }
                            </select>
                        }
                    </div>
                    <button onClick={()=>goAndAddMcq()}>GO AND ADD MCQ</button>
                </div>
            }
        </div>
    )
}
export default AddMcqTest;