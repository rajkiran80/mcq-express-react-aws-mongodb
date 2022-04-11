import { useState,useEffect } from "react";
import style from "./AddexamAndSubject.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AddexamAndSubject=()=>{
     let navigate=useNavigate();
     const [subjects,setSubjects]=useState([1])
     const [examInput,setExamInput]=useState({examName:null,examFile:null})
     const [subjectsInput,setSubjectsInput]=useState([{subjectName:null,subjectFile:null}])
     const [isInputValid,setIsInputValid]=useState(false)
     const [fileExtensions,setFileExtensions]=useState(["jpg","png","jpeg","jfif"])
     const [errorMessage,setErrorMessage]=useState("")
     const addSubject=()=>{
         setSubjects([...subjects,subjects.length+1])
         setSubjectsInput([...subjectsInput,{subjectName:null,subjectFile:null}])
         setIsInputValid(false)
     }
     const removeSubject=()=>{
         if(subjects.length !== 1){
            const updatedListOfSubjects=[...subjects];
            updatedListOfSubjects.pop();
            setSubjects(updatedListOfSubjects);
            const updatedListOfInputSubject=[...subjectsInput];
            updatedListOfInputSubject.pop();
            setSubjectsInput(updatedListOfInputSubject);
            setIsInputValid(false)
         }
     }
     const getInputSubject=(e,index)=>{
           const upadtedData=subjectsInput.filter((subject,indexs) => {
                if(index === indexs){
                     subject.subjectName=e.target.value;
                }
                return subject;
           })
           setSubjectsInput(upadtedData)
     }
     const selectFile=(e,index)=>{
          const selectedFile=subjectsInput.filter((subject,indexs)=>{
                let isExtensionValid=false;
                if(index === indexs){
                    let fileExtension=e.target.files[0].name.split(".");
                    fileExtensions.forEach((extension)=>{
                        if(extension === fileExtension[fileExtension.length-1]){
                            isExtensionValid=true;
                        }
                    })
                    if(isExtensionValid === true){
                        subject.subjectFile=e.target.files[0];
                        setIsInputValid(false);
                    
                    }else{
                        setIsInputValid(true);
                        setErrorMessage("currently accepted files are png,jpg,jpeg,jfif");
                    }
                }
                return subject;
          })
          setSubjectsInput(selectedFile)
     }
     const addDataIntoDatabase=(e)=>{
           e.preventDefault();
           if(isInputValid === false){
                let flag=true;
                subjectsInput.forEach((subject)=>{
                    if(subject.subjectName === null || subject.subjectFile === null || subject.subjectName === "" || subject.subjectFile === "" || examInput.examName === "" || examInput.examName === null || examInput.examFile === "" || examInput.examFile === null){
                        setIsInputValid(true);
                        setErrorMessage("all fields can't be empty");
                        flag=false;
                        return;
                    }
                })
                if(flag){
                    setIsInputValid(false);
                    let formData=new FormData();
                    formData.append("file",examInput.examFile);
                    subjectsInput.forEach((subject)=>{
                        formData.append("file",subject.subjectFile);
                        formData.append("subjects",subject.subjectName);
                    })
                    formData.append("examName",examInput.examName);
                    axios.post("https://mcq-api-react-express.herokuapp.com/add-exam-and-subjects",formData)
                    .then((result)=>{
                         alert("data inserted successfully");
                         navigate("/admin");
                    })
                    .catch((error)=>{
                         console.log(error);
                    })
                }
            }else{
                setErrorMessage("currently accepted files are png,jpg,jpeg,jfif");
            }
     }
     const setExamName=(e)=>{
           setExamInput({examName:e.target.value,examFile:examInput.examFile})
     }
     const setExamFile=(e)=>{
            let isExtensionValid=false;
            let fileExtension=e.target.files[0].name.split(".");
            fileExtensions.forEach((extension)=>{
                if(extension === fileExtension[fileExtension.length-1]){
                    isExtensionValid=true;
                }
            })
            if(isExtensionValid === true){
                setExamInput({examName:examInput.examName,examFile:e.target.files[0]})
                setIsInputValid(false);
            
            }else{
                setIsInputValid(true);
                setErrorMessage("currently accepted files are png,jpg,jpeg,jfif");
            }
     }
     return(
        <form>
            <div className={style.addExamNameContainer}>
               <div className="input-add-exam">
                   <div className={style.inputFileWrapper}>
                         <input type="text" placeholder="enter exam name" required onChange={(e)=>setExamName(e)}/>
                         <label className={style.customFileUpload}>
                              <input type="file" required onChange={(e)=>setExamFile(e)}/>
                               upload
                         </label>
                   </div>
               </div>
                <div className={style.addSubjects}>
                    {
                       subjects.map((subject,index)=>{
                            return  <div className={style.inputFileWrapper} key={subject}>
                                        <input type="text" placeholder="enter subject name" required onChange={(e)=>getInputSubject(e,index)}/>
                                        <label className={style.customFileUpload}>
                                            <input type="file" required onChange={(e)=>selectFile(e,index)}/>
                                            upload
                                        </label>
                                    </div>
                       })
                    }
                </div>
                {
                    isInputValid && <h5 className={style.error}>{errorMessage}</h5>
                }
                <div className={style.btnWrapper}>
                    <button type="button" onClick={()=>removeSubject()}>remove subject</button>
                    <button type="button" onClick={()=>addSubject()}>add subject</button>
                    <button type="button" onClick={(e)=>addDataIntoDatabase(e)}>add exam</button>
                </div>
            </div>
         </form>
     )
}
export default AddexamAndSubject;