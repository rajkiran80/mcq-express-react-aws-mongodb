import SelectExam from "./frontpart/SelectExam";
import css from "./style.css";
import Grid from "./frontpart/Grid";

const Home=()=>{
   
    return (
        <>
           <div className="container">
                <Grid>
                    <SelectExam/>
                </Grid>
           </div>
        </>
    )
  }
  
  export default Home