import {useEffect, useState,useRef} from 'react'
import SigninSignupCss from './SigninSignup.module.css'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import Card from './Card'

const SigninSignup=()=>{
    let navigate=useNavigate();
    {/*Handling Sign In Or Sign Up Dialog Box*/}
        const [data,UpdateData]=useState([true,false])
        const [currentSlideNumber,setCurrentSlideNumber]=useState(0)
        const changeSlide=(current)=>{
            if(current === 1 && currentSlideNumber !== 1){
                const updateD=data.map((each,index)=>{
                    if((currentSlideNumber+1) === index){
                        each=true
                    }else{
                        each=false
                    }
                    return each
                })
                UpdateData(updateD)
                setCurrentSlideNumber(currentSlideNumber+1)
            }else if(current === -1 && currentSlideNumber !== 0){
                const updateD=data.map((each,index)=>{
                    if((currentSlideNumber-1) === index){
                        each=true
                    }else{
                        each=false
                    }
                    return each
            })
            UpdateData(updateD)
            setCurrentSlideNumber(currentSlideNumber-1)
            }
        }
    {/*End Of Handling Sign In Or Sign Up Dialog Box*/}

    {/*admin login*/}
                const adminEmailRef=useRef()
                const adminPswdRef=useRef()
                const [isLogin,setIsLogin]=useState(true)
                const [isCredentialValid,setCredentialValid]=useState(false)
                const loginAdmin=()=>{
                    let adminEmailData=adminEmailRef.current.value
                    let adminPswdData=adminPswdRef.current.value
                    {/*email and password can not be empty*/}
                    if(adminEmailData !== "" && adminPswdData !== ""){
                           
                        axios.post("https://mcq-api-react-express.herokuapp.com/login",{email:adminEmailData,pswd:adminPswdData})
                        .then((response)=>{
                             if(response.data.length === 0){
                                 setCredentialValid(true)
                             }else{
                                 alert("login successfull");
                                 setCredentialValid(false);
                                 adminEmailRef.current.value="";
                                 adminPswdRef.current.value="";
                                 localStorage.setItem("jwt_token_set","absftsb12288y3427162");
                                 navigate("/admin/home");
                             }
                        })
                        .catch((err)=>{
                            setCredentialValid(true)
                        })

                    }else{
                        {/*thowing error message since email and password is empty*/}
                        setCredentialValid(true)
                    }
                }
    {/*End of admin login*/}
    return (
        <>
            <div className={SigninSignupCss.wrapper}>
                {/* sign in */}
                    <Card animate={data[0]}>
                        <div className={SigninSignupCss.inputWrapper}>
                            <input type="text" placeholder='enter your username' ref={adminEmailRef} name="email"/>
                            <input type="password" placeholder='enter your password' ref={adminPswdRef} name="pswd"/>
                            <button className={SigninSignupCss.btn} onClick={()=>loginAdmin()} style={{backgroundColor:"#FF0075",color:"#fff"}}>LOGIN</button>
                            <h5 style={{color:"red",padding:"5px"}}>{isCredentialValid && "please enter valid credential"}</h5>
                        </div>
                        <div className={SigninSignupCss.btnWrapper}>
                            <button className={SigninSignupCss.btn} onClick={()=>changeSlide(-1)}>SIGN IN</button>
                            <button className={SigninSignupCss.btn} onClick={()=>changeSlide(1)}>SIGN UP</button>
                        </div>
                    </Card>
                {/* sign up */}
                    <Card animate={data[1]}>
                        <div className={SigninSignupCss.inputWrapper}>
                            <input type="text" placeholder='enter your name'/>
                            <input type="text" placeholder='enter your email'/>
                            <input type="text" placeholder='enter your password'/>
                        </div>
                        <div className={SigninSignupCss.inputWrapper}>
                            <button className={SigninSignupCss.btn} style={{backgroundColor:"#FF0075",color:"#fff"}}>SUBMIT</button>
                        </div>
                        <div className={SigninSignupCss.btnWrapper}>
                           <button className={SigninSignupCss.btn} onClick={()=>changeSlide(-1)}>SIGN IN</button>
                           <button className={SigninSignupCss.btn} onClick={()=>changeSlide(1)}>SIGN UP</button>
                        </div>
                    </Card>
            </div>
        </>
    )
}
  export default SigninSignup