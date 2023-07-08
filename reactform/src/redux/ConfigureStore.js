import { configureStore } from "@reduxjs/toolkit";
import {stringToSlug} from '../util/Utilities.js'

const register = {
    email:'',
    name:'',
    phone:'',
    id:''
}
const errorArr = {
    emailError:'*',
    nameError:'*',
    phoneError:'*',
    idError:'*',
    validate:false
}
const stateForm ={
    idInputState:false,
    addButtonState:false,
    editButtonState:true
}
const nullValidate=(value)=>{
    if(value.trim()===''){
        return 'Không được để trông';
    }
    else{
        return '';
    }
}
const setLocalStorange=(listRegister)=>{
    if(typeof(Storage)!=='undefined'){
        let arrRegisterJson = JSON.stringify(listRegister);
        localStorage.setItem('arrRegister',arrRegisterJson);
        return true;
    }
    else{
        alert('Trình duyệt không hổ trợ LocalStorange!'); 
        return false;
    }
}
const getDataFromLocalStorage=()=>{
    if(typeof(Storage)!=='undefined'){
         const arrRegisterJson = localStorage.getItem('arrRegister');
        return JSON.parse(arrRegisterJson);
    }
    else{
        alert('Trình duyệt không hổ trợ LocalStorange!');
        return false;
    }
}
export const store = configureStore({ 
        
        reducer:{
            registerReducer:(state=register,action)=>{
                switch (action.type){
                    case 'FORM_HANDLE_CHANGE':{
                        const {id,value} = action.payload;
                        let newState = {...state};
                        newState[id] = value;
                        state = newState;
                        break;
                    }
                    case 'EDIT_REGISTER':{
                        const registerEdit = action.payload;
                        state = registerEdit;
                        break;
                    }
                    case 'ADD_REGISTER':{
                        let newState = register;
                        state = newState;
                        break;
                    }
                    case 'EDIT_FORM_COMMIT':{
                        let newState = register;
                        state = newState;
                        break;
                    }  
                }
                return state;
            },
            arrRegisterReducer:(state=[],action)=>{
                if(getDataFromLocalStorage()){
                    state = getDataFromLocalStorage();
                }
                switch (action.type){
                    case 'ADD_REGISTER':{
                        getDataFromLocalStorage();
                        const newState = [...state,action.payload];
                        state = newState;
                        setLocalStorange(state);
                        break;
                    }
                    
                    case 'DELETE_REGISTER':{
                        const {id} = action.payload;
                        getDataFromLocalStorage();
                        if(state.findIndex(item=>item.id==id)!==-1){
                            let newState = [...state];
                            let deleteState = newState.filter(item=>item.id!==id);
                            state = deleteState;
                            setLocalStorange(state);
                        }
                        break;
                    }
                    case 'EDIT_FORM_COMMIT':{
                        getDataFromLocalStorage();
                        const {id} = action.payload;
                        let indexEdit = state.findIndex(item=>item.id==id);
                        let newState = [...state];
                        newState[indexEdit] = action.payload;
                        state = newState;
                        setLocalStorange(state);
                        break;
                    }
                    case 'GET_ARR_REGISTER':{
                        const searchSlug = stringToSlug(action.payload);
                        const cloneState = [...state];
                        let newState = cloneState.filter(item => {
                            return stringToSlug(item.name).search(searchSlug)!==-1});
                        state = newState;
                        break;
                    }
                }
                return state;
            },
            arrErrorReducer:(state=errorArr,action)=>{
                    
                    switch (action.type){
                        case 'FORM_HANDLE_CHANGE':{
                            const {id,value} = action.payload;
                            let newState = {...state};
                            if(nullValidate(value)){
                                newState[`${id}Error`] = nullValidate(value);
                            }
                            else{
                                switch (id){
                                    case 'email':{
                                        var emailRegex = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
                                        if(!emailRegex.test(value)){
                                            newState[`${id}Error`] = 'Email sai định dạng!';
                                        }
                                        else{
                                            newState[`${id}Error`] = '';
                                        }
                                        state = newState;
                                        break;
                                    }
                                    case 'name':{
                                        var nameRegex = /[a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ']$/g;
                                        if(!nameRegex.test(value)){
                                            newState[`${id}Error`] = 'Name sai định dạng!';
                                        }
                                        else{
                                            newState[`${id}Error`] = '';
                                        }
                                        state = newState;
                                        break;
                                    }
                                    case 'phone':{
                                        var phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                                        if(!phoneRegex.test(value)){
                                            newState[`${id}Error`] = 'Phone sai định dạng!';
                                        }
                                        else{
                                            newState[`${id}Error`] = '';
                                        }
                                        state = newState;
                                        break;
                                    }
                                    case 'id':{
                                        var accountRegex = /(^[0-9]{4})\b/g;
                                        if(!accountRegex.test(value)){
                                            newState[`${id}Error`] = 'nhập vao 4 số';
                                        }
                                        else{
                                            
                                            newState[`${id}Error`] = ''; 
                                        }
                                        state = newState;
                                        break;
                                    }
                                }
                            }
                            state = newState;
                            break;
                        }
                        case 'ADD_REGISTER':{
                            state = errorArr;
                            break;
                        }
                    }
                    
                return state;
            },
            stateFormReducer:(state=stateForm,action)=>{
                switch(action.type){
                    case 'EDIT_REGISTER':{
                        let newState = {...state};
                        newState['idInputState']=true;
                        newState['editButtonState']=false;
                        newState['addButtonState']=true;
                        state = newState;
                        break;
                    }
                    case 'EDIT_FORM_COMMIT':{
                        let newState = {...state};
                        newState['idInputState']=false;
                        newState['editButtonState']=true;
                        newState['addButtonState']=false;
                        state = newState;
                        break;
                    }
                }
                return state
            }
        }
    }
)


