import style from "./AvailableTests.module.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AvailableTests=()=>{
    const {examName,examSubject}=useParams();
    const [isLoading,setIsLoading]=useState(true);
    const [allAvailableMcq,setAllAvailableMcq]=useState([]);
    useEffect(()=>{
        axios.get(`https://mcq-api-react-express.herokuapp.com/fetch-mcq/${examName}/${examSubject}`)
        .then((result)=>{
             const pushArray=[];
             result.data.forEach((item,index)=>{
                pushArray.push(item._id);
             })
             setAllAvailableMcq(pushArray);
             setIsLoading(false);
        })
        .catch((err)=>{
             console.log(err)
        })
    },[])
    return(
        <div className={style.availableTests}>
            {isLoading ? <h2 style={{textAlign:"center",color:"white"}}>DATA IS LAODING.....</h2> :
                    <ul>
                        {
                            allAvailableMcq.map((test,index)=>{
                                return  <li key={test}>
                                            <Link to={"/open-test/"+examName+"/"+examSubject+"/"+test}>
                                                    Test
                                                    <div>{index+1}</div>
                                            </Link>
                                        </li>
                            })
                        }
                    </ul>
            }
        </div>
    )
}
export default AvailableTests;