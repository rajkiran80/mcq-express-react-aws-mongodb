import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <div className={style.navbar}>
              <h3><Link to="/">MCQ ADDA</Link></h3>
        </div>
    )
}
export default Navbar;