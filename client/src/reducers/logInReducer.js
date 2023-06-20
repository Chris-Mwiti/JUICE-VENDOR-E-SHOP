function logInReducer (state,action){
    switch(action.type){
        case 'handleEmailChange': return{
            ...state,
            email: action.email
        }
        case 'handlePasswordChange': return{
            ...state,
            password: action.password
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

        case "loading": return{
            ...state,
            email: "",
            password: "",
            creatingStatus:{
                ...state.creatingStatus,
                loading: true,
                snackBarOpen: false
            }
        }

        case "successAuthenticatingUser": return{
            ...state,
            email: "",
            password: "",
           creatingStatus:{
            ...state.creatingStatus,
            loading:false,
            errorStatus: false,
            successStatus: true,
            message: "Account has been successfully created",
            snackBarOpen: true
           }
        }
        case "errorAuthenticatingUser": return{
            ...state,
            creatingStatus:{
            ...state.creatingStatus,
            loading:false,
            errorStatus: true,
            successStatus: false,
            message: action.message,
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
    }
}

export default logInReducer