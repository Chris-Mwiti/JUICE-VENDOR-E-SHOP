function signUpReducer(state,action){
    switch(action.type){
        // User Personal Details state managers
        case "setFirstName": return{
            ...state,
            firstname: action.newFirstname
        }
        
        case "setLastName": return{
            ...state,
            lastname: action.newLastname
        }

        case "setEmail": return{
            ...state,
            email: action.newEmail
        }

        case "setPassword": return{
            ...state,
            password: action.newPassword
        }

        case "setCfrPwd": return{
            ...state,
            cfrPwd: action.newCfrPwd
        }

        case "handleShowPwd": return{
            ...state,
            showPwd: !state.showPwd
        }

        case "addErrMsg": return{
            ...state,
            errMsg: true
        }

        case "removeErrMsg": return{
            ...state,
            errMsg: false
        }

        case "creatingUser": return{
            ...state,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cfrPwd: "",
            creatingStatus:{
                ...state.creatingStatus,
                loading: true,
                snackBarOpen: false
            }
        }

        case "doneCreatingUser": return{
            ...state,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cfrPwd: "",
           creatingStatus:{
            ...state.creatingStatus,
            loading:false,
            errorStatus: false,
            successStatus: true,
            message: "Account has been successfully created",
            snackBarOpen: true
           }
        }
        case "errorCreatingUser": return{
            ...state,
            creatingStatus:{
            ...state.creatingStatus,
            loading:false,
            errorStatus: true,
            successStatus: false,
            message: "Account has not been created please try again later",
            snackBarOpen: true
           }
        }
        case "handleSnackBarClose": return{
            ...state,
            creatingStatus:{
                ...state.creatingStatus,
                snackBarOpen: false
            }
        }

        default:
            state
    
    }
}

export default signUpReducer