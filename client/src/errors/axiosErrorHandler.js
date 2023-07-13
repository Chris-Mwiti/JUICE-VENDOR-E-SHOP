import axios from 'axios'
export function httpErrorHandler(error,dispatch) {
  if (error === null) throw new Error('Unrecoverable error!! Error is null!')
  if (axios.isAxiosError(error)) {
    //here we have a type guard check, error inside this if will be treated as AxiosError
    const response = error?.response
    const request = error?.request
    const config = error?.config //here we have access the config used to make the api call (we can make a retry using this conf)

    if (error.code === 'ERR_NETWORK') {
      console.log('connection problems..')
    } else if (error.code === 'ERR_CANCELED') {
      console.log('connection canceled..')
    }
    if (response) {
      //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
      const statusCode = response?.status
       switch(statusCode){
            
            case 401: return dispatch({type: "errorAuthenticatingUser", message: "Unauthorized"})
            case 500: return dispatch({type: "errorAuthenticatingUser", message: "Please try again later"})
            default: 
                dispatch({type: "errorAuthenticatingUser", message: "Please try agin later"});
        }
    } else if (request) {
      //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
      dispatch({type: "errorAuthenticatingUser", message: "Please try again later"})
    }
  }
  //Something happened in setting up the request and triggered an Error
  console.log(error.message)
}