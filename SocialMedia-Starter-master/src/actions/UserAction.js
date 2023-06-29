import * as UserApi from '../api/UserRequest'
export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" })
    try {
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({ type: "UPDATING_SUCCESS", data: data })
    }
    catch (er) {
        dispatch({ type: "UPDATING_FAIL" })
    }
}

export const followuser = (id,data) => async(dispatch) => {
    dispatch({type:"FOLLOW_USER", data: id})
    try {
       UserApi.followuser(id,data)
       console.log("followed")
    }
    catch (er) {
        console.log(er) 
    }
}

export const unfollowuser = (id,data) => async(dispatch) => {
    dispatch({type:"UNFOLLOW_USER", data: id})
    try {
       UserApi.unfollowuser(id,data)
       console.log("unfollowed")
    }
    catch (er) {
        console.log(er) 
    }
}