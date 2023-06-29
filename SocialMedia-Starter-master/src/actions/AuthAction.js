import * as AuthApi from '../api/AuthRequest.js'
export const login = (formdata) => async (dispatch) => {
    dispatch({type:"AUTH_START"})
    try {
        const { data } = await AuthApi.login(formdata)
           dispatch({type:"AUTH_SUCCESS",data:data})
  
    }
    catch (err) {
        console.log(err)
        dispatch({type:"AUTH_FAIL"})
    }
}

export const signup = (formdata) => async (dispatch) => {
    dispatch({type:"AUTH_START"})
    try {
        const { data } = await AuthApi.signup(formdata)
        dispatch({type:"AUTH_SUCCESS",data:data})
        console.log(data)
    } catch (err) {
        console.log(err)
        dispatch({type:"AUTH_FAIL"})
    }
}


export const logout = () => async (dispatch) =>{
    dispatch({type:"LOG_OUT"})
}