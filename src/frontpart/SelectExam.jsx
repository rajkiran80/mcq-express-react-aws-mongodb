import {Link} from "react-router-dom";
import style from "./SelectExam.module.css";
import Grid from "../frontpart/Grid";
import { useEffect,useState } from "react";
import axios from "axios";

const SelectSubject=()=>{
    const [examDetails,setExamDetails]=useState(null);
    const [isLoading,setIsloading]=useState(true);
    useEffect(()=>{
         axios.get("https://mcq-api-react-express.herokuapp.com/fetch-exams-subjects")
        .then((result)=>{
             setExamDetails(result.data)
             setIsloading(false)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    return(
         <>
             {
                isLoading ? <h2 style={{textAlign:"center",color:"white"}}>DATA IS LAODING.....</h2>
                            : <ul className={style.listWrapper}>
                                 {
                                    examDetails.map((exam)=>{
                                       return   <li key={exam._id}>
                                                   <Link to={"/select-subject/"+exam._id+"/"+exam.examName}>
                                                         <img src={exam.examAndSubjectsLogo[0]} alt="nothing"/>
                                                         <h5 style={{textTransform:"uppercase"}}>{exam.examName}</h5>
                                                   </Link>
                                                </li>
                                    })
                                 }
                              </ul>
             }
         </>
    )
}
export default SelectSubject;