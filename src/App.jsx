import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomeAdmin from './AdminPanel/Home';
import HomeFrontEnd from './Home';
import WrappersigninSignup from "./AdminPanel/auth/WrapperSigninSignup";
import Navbar from "./frontpart/Navbar";
import SelectSubject from "./MainFolder/SelectSubject";
import AvailableTests from "./MainFolder/AvailableTests";
import OpenTest from "./MainFolder/OpenTest";
import Home from "./AdminPanel/Home";
import AddexamAndSubject from "./AdminPanel/main/AddexamAndSubject";
import SelectExamAndSubject from "./AdminPanel/main/SelectExamAndSubject";
import AddMcqTest from "./AdminPanel/main/AddMcqTest";

const App=()=>{
  return (
      <>
          <Router>
                <Navbar/>
                 <Routes>
                      <Route path="/" element={<HomeFrontEnd/>}/>
                      <Route path="/select-subject/:id/:examName" element={<SelectSubject/>}/>
                      <Route path="/select-test/:examName/:examSubject" element={<AvailableTests/>}/>
                      <Route path="/open-test/:examName/:examSubject/:id" element={<OpenTest/>}/>

                      {/*Restricated routes */}
                      <Route path="/admin" element={<WrappersigninSignup/>}/>
                      <Route path="/admin/home" element={<Home/>}/>
                      <Route path="/admin/add-exam-subject" element={<AddexamAndSubject/>}/>
                      <Route path="/admin/select-exam-subject" element={<SelectExamAndSubject/>} />
                      <Route path="/admin/generate-new-mcq" element={<AddMcqTest/>}/>
                  </Routes>
          </Router>
      </>
  )
}

export default App;
