import { useEffect } from 'react';
import {useNavigate,Link} from "react-router-dom";
import style from './Home.module.css';
import SigninSignup from './auth/SigninSignup';
import AddexamAndSubject from "./main/AddexamAndSubject";

const Home=()=>{
    let naviage=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("jwt_token_set") !== "absftsb12288y3427162"){
            naviage("/admin");
        }
    })

    return (
        <>
            <div className={style.containerAdmin}>
                  <div className={style.mainAdminChild}>
                        <Link to="/admin/add-exam-subject">
                            ADD EXAM 
                            <br/>&<br/>
                            Subjects
                        </Link>
                  </div>
                  <div className={style.mainAdminChild}>
                        <Link to="/admin/select-exam-subject">
                            ADD NEW 
                            <br/>MCQ<br/>
                            Test
                        </Link>
                  </div>
            </div>
        </>
    )
  }
  
  export default Home