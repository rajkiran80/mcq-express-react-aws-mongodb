import Grid from "../frontpart/Grid";
import style from "./SelectSubject.module.css";
import {Link,useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

const SelectSubject=()=>{
    const paramsId=useParams().id;
    const paramsExam=useParams().examName;
    const [data,setData]=useState(null);
    const [subjectsLogo,setSubjectLogo]=useState([])
    useEffect(()=>{
        axios.get("https://mcq-api-react-express.herokuapp.com/fetch-exams-subjects")
        .then((result)=>{
              const obj=result.data.filter((exam)=>{
                    if(exam._id === paramsId){
                          return exam;
                    }
              })
              setData(obj[0])
              const addedSubjectsLogo=obj[0].examAndSubjectsLogo.filter((subject,index)=>{
                   if(index != 0){
                       return subject;
                   }
              })
              setSubjectLogo(addedSubjectsLogo);

        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    return(
        
            <Grid>
                    <div className={style.selctSubjectWrapper}>
                        {
                            data === null ? <h2 style={{textAlign:"center",color:"white"}}>DATA IS LAODING.....</h2>
                            
                                          :     
                                            data.respectiveSubjects.map((subject,index)=>{
                                                return <div key={index}>
                                                           <img src={subjectsLogo[index]}/>
                                                           <Link to={"/select-test/"+paramsExam+"/"+subject}>{subject}</Link>
                                                       </div>
                                            })  
                        }
                    </div>
            </Grid>
        
    )
}
export default SelectSubject;