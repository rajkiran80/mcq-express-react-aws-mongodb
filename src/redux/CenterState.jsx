import {createStore} from 'redux';

const mainObj={cq:1,updateUi:false,selectedExamAdmin:"",selectedSubjectAdmin:""};

const reducer=(state=mainObj,action)=>{
    if(action.type === "SHOW_CURRENT_QUESTION"){
         state.cq=action.currentOption;
    }
    if(action.type === "UPDATE_STATE"){
        state.updateUi=action.updateState
    }
    if(action.type === "SELECT_EXAM_SUBJECT"){
        state.selectedExamAdmin=action.selectedexam;
        state.selectedSubjectAdmin=action.selectedsubject;
    }
    return state;
}
const store=createStore(reducer);
export default store;

