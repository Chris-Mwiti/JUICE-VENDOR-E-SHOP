import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Container } from "../styles/styledComponents";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// React imports
import { useReducer} from 'react'

// Controllers
import RegistrationController from "../controllers/registrationController";

// Reducers
import logInReducer from "../reducers/logInReducer";
import ACTION_TYPES from "../global/globalActionTypes";

const LogInForm = ({appDispatch}) => {
    const logStates = {
        email: "",
        password:  "",
        showPwd: false,
        errMsg: false,
        creatingStatus:{
            loading: false,
            errorStatus: false,
            successStatus: false,
            message: "",
            snackBarOpen: false
        },
        accessToken: null
    }
    
    const [state,dispatch] = useReducer(logInReducer, logStates)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (state.password == '' || state.email == '') return dispatch({type:"addErrMsg"})
        dispatch({type:"removeErrMsg"})
        // Object containing user info
        const userData = {
            email: state.email,
            password: state.password
        }

        try {
            // Dispatch loading status & create an instance of the registartion controller
            dispatch({type: "loading"})
            const registrationController = new RegistrationController(userData,dispatch)
            registrationController.logInUser().then((response) => {
              if(response.status == undefined) return
              
              dispatch({type: "successAuthenticatingUser"});
              appDispatch({type: ACTION_TYPES.CHECK_LOGGEDIN_STATUS.IS_LOGGED_IN});
            })
        } catch (error) {
            console.error(error)
        }
        
    }
    return ( 
        <Container  display={'flex'} justifyContent={'center'} alignItems={'center'} padding={3}>
            <Container display={'flex'} flexDirection={'column'} gap={2} padding={2} maxWidth={600} border={2} boxShadow={3} borderColor={'#e2e2e2'} borderRadius={2}>
                <Typography variant="h4">Welcome!</Typography>
                <Typography variant="body1">Create an account</Typography>

                <Box component="form" display={'flex'} flexDirection={'column'} gap={2} onSubmit={(e) => handleSubmit(e)}>
                    <Stack direction={'column'} spacing={2} width={'100%'}>
                        <TextField id="email" type="email" value={state.email} onChange={(e) => dispatch({type: "handleEmailChange", 
                        email: e.target.value})} label="Email" required error={state.errMsg} />
                        <TextField id="password" type= {state.showPwd ? "text" : "password"} value={state.password} onChange={(e) => dispatch({type: "handlePasswordChange", password: e.target.value})} label="Password" required  InputProps={{
                            endAdornment:<InputAdornment position="end">
                                            <IconButton onClick={() => dispatch({type: "handleShowPwd"})} edge="end" color="primary">
                                                {state.showPwd ? (<Visibility />) : (<VisibilityOff />)}
                                            </IconButton>
                                        </InputAdornment>
                        }} helperText={state.errMsg ? "Please enter a password" : ''} error={state.errMsg}/>
                    </Stack>
                    <Button variant="contained" type="submit" disabled={state.creating}>
                        {state.creating ? (<CircularProgress color="primary" />) : "Log In"}
                    </Button>
                </Box>
            </Container>
            <Snackbar open={state.creatingStatus.snackBarOpen} autoHideDuration={6000} onClose={() => dispatch({type: "handleSnackBarClose"})}>
                <Alert onClose={() => dispatch({type: "handleSnackBarClose"})} severity={state.creatingStatus.successStatus ? "success" : "error"} sx={{ width: '100%' }}>
                    {state.creatingStatus.message}
                </Alert>
            </Snackbar>

        </Container>
    );
}

export default LogInForm