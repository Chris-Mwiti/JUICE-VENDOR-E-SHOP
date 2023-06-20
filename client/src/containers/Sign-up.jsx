// MUI COMPONENTS
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, Snackbar, Stack, Stepper, TextField, Typography } from "@mui/material";
import { Container } from "../styles/styledComponents";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// React imports
import {useEffect, useReducer} from 'react'

// Controllers
import RegistrationController from "../controllers/registrationController";

// Reducers
import signUpReducer from "../reducers/signUpReducer";

const SignUpForm = () => {
    const signStates = {
        // User details states
        firstname: "",
        lastname: "",
        email: "",
        password:  "",
        cfrPwd: "",
        showPwd: false,
        errMsg: false,
        creatingStatus:{
            loading: false,
            errorStatus: false,
            successStatus: false,
            message: "",
            snackBarOpen: false
        }
    }
    
    const [state,dispatch] = useReducer(signUpReducer, signStates)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (state.password != state.cfrPwd) return dispatch({type:"addErrMsg"})
        dispatch({type:"removeErrMsg"})
        // Object containing user info
        const userData = {
            firstName: state.firstname,
            lastName: state.lastname,
            email: state.email,
            password: state.cfrPwd
        }

        try {
            // Dispatch loading status & create an instance of the registartion controller
            dispatch({type: "creatingUser"})
            const registrationController = new RegistrationController(userData)
            registrationController.addNewUser().then((response) => {
                console.log(response);
                // Check if the response is ok
                if (response != 201) return dispatch({type: "errorCreatingUser"})

                dispatch({type: "doneCreatingUser"})
            })
        } catch (error) {
            console.error(error.message)
        }
        
    }
    return ( 
        <Container  display={'flex'} justifyContent={'center'} alignItems={'center'} padding={3}>
            <Container display={'flex'} flexDirection={'column'} gap={2} padding={2} maxWidth={600} border={2} boxShadow={3} borderColor={'#e2e2e2'} borderRadius={2}>
                <Typography variant="h4">Welcome!</Typography>
                <Typography variant="body1">Create an account</Typography>

                <Box component="form" display={'flex'} flexDirection={'column'} gap={2} onSubmit={(e) => handleSubmit(e)}>
                    <Stack direction={'column'} spacing={2} width={'100%'}>
                        <TextField type="text" value={state.firstname} onChange={(e) => dispatch({type: "setFirstName", 
                        newFirstname: e.target.value})} label="Firstname" required />
                        <TextField id="lastname" type="text" value={state.lastname} onChange={(e) => dispatch({type: "setLastName", 
                        newLastname: e.target.value})} label="Lastname" required />
                        <TextField id="email" type="email" value={state.email} onChange={(e) => dispatch({type: "setEmail", 
                        newEmail: e.target.value})} label="Email" required />
                        <TextField id="password" type= {state.showPwd ? "text" : "password"} value={state.password} onChange={(e) => dispatch({type: "setPassword", newPassword: e.target.value})} label="Password" required  InputProps={{
                            endAdornment:<InputAdornment position="end">
                                            <IconButton onClick={() => dispatch({type: "handleShowPwd"})} edge="end" color="primary">
                                                {state.showPwd ? (<Visibility />) : (<VisibilityOff />)}
                                            </IconButton>
                                        </InputAdornment>
                        }}/>
                        <TextField id="cfrPwd" type= {state.showPwd ? "text" : "password"} value={state.cfrPwd} onChange={(e) => dispatch({type: "setCfrPwd", newCfrPwd: e.target.value})} label="Confirm Password" required  
                        InputProps={{
                            endAdornment: <InputAdornment position="end" >
                                            <IconButton onClick={() => dispatch({type: "handleShowPwd"})} edge="end">
                                                    {state.showPwd ? (<Visibility color="primary"/>) : (<VisibilityOff color="primary" />)}
                                                </IconButton>
                                        </InputAdornment>
                        }} error={state.errMsg} helperText={state.errMsg ? "Password does not match" : ""}/>
                    </Stack>
                    <Button variant="contained" type="submit" disabled={state.creating}>
                        {state.creating ? (<CircularProgress color="primary" />) : "Create Account"}
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
 
export default SignUpForm;