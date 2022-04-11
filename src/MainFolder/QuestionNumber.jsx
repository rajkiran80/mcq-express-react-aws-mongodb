import {useState,useRef, useEffect} from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "../redux/CenterState";
import Questions from "../jsonData/question";

const QuestionNumber=(props)=>{
    const [numberOfQuestions,setNumberOfQuestions]=useState([]);
    useEffect(()=>{
        setNumberOfQuestions(props.questionsAndAnswers);
    },[])
    const settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 10,
        swipeToSlide:true,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1800,
              settings: {
                slidesToShow: 23,
                slidesToScroll: 3,
                infinite: true,
                dots: false
              }
            },
            {
                breakpoint: 1290,
                settings: {
                  slidesToShow: 20,
                  slidesToScroll: 3,
                  infinite:true
                }
              },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 8,
                slidesToScroll: 3,
                infinite:true
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 3
              }
            }
          ]
    };
    const selectQuestion=(cq)=>{
        store.dispatch({
            type:"SHOW_CURRENT_QUESTION",
            currentOption:cq
        })
    }
    const answerCorrectCss={backgroundColor: "rgb(14,206,109)",width:"100%",height:"100%",display:"inline-block",color:"white"};
    const wrongAnswer={backgroundColor:"red",width:"100%",height:"100%",display:"inline-block",color:"white"};
    const defaultColor={backgroundColor:"#222",width:"100%",height:"100%",display:"inline-block",color:"white"};
    return(
           
       <div>
            {
                numberOfQuestions.length === 0 ? <h2 style={{textAlign:"center",color:"white"}}>DATA IS LAODING.....</h2> :
                <Slider {...settings}>
                              
                              {
                                  numberOfQuestions.map((item,index)=>{
                                      return  <li 
                                                  onClick={()=>selectQuestion(index+1)}
                                                  key={index}
                                              >
                                                  <span style={item.isCorrect === 1 ? answerCorrectCss : item.isCorrect === 2 ? wrongAnswer:defaultColor}
                                                        
                                                        
                                                  >{index+1}</span>
                                              </li>
                                  })
                              }
                  
                </Slider>
            }
       </div>
               
    )
}
export default QuestionNumber;