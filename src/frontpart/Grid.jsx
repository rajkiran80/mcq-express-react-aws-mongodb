import style from "./Grid.module.css";
import { Link } from "react-router-dom";

const Grid=({children})=>{
    return(
        <div className={style.gridWrapper}>
             {children}
        </div>
    )
}
export default Grid