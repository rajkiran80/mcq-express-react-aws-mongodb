import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import SigninSignup from './SigninSignup';

const WrappersigninSignup=()=>{
    let navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("jwt_token_set") === "absftsb12288y3427162"){
             navigate("/admin/home");
        }
    })
    const css={
        width:"100vw",
        height: "100vh",
        backgroundColor: "rgb(34, 31, 31)"
    };
    return (
        <>
            
           <div style={css}>
               <SigninSignup/>
           </div>
           
        </>
    )
  }
  
  export default WrappersigninSignup;