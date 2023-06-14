import { Stepper } from "@mui/material";
import { Container } from "../styles/styledComponents";

// React imports
import {useEffect, useReducer} from 'react'

const initState = {
    // User details states
    firstname: "",
    lastname: "",
    email: "",
    password:  "",
    cfrPwd: "",
    errMsg: "",
    activeStep: 0,
}

function signUpReducer(state,action){
    switch(action.types){
        // User Personal Details state managers
        case "setFirstname":return{...state, firstname: action.firstname}
        case "setLastname": return{...state, lastname:action.lastname}
        case "setEmail": return{...state, email: action.email}
        case "setPassword": return{...state, password: action.password}
        case "setCfrPwd": return{...state, cfrPwd: action.cfrPwd}

        // Button click managers
        case "handleNext": return{...state, activeStep: state.activeStep + 1}
        case "handleBack": return{...state, activeStep: state.activeStep - 1}
    }
}

const SignUpForm = () => {
    
    const [state,dispatch] = useReducer(signUpReducer, initState)
    return ( 
        <Container>
            <Stepper></Stepper>
        </Container>
    );
}
 
export default SignUpForm;