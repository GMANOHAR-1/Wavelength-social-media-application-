import * as uploadApi from '../api/UploadRequest'
export const uploadImage = (data) =>
    async (dispatch) => {
        try {
            await uploadApi.uploadImage(data)
            console.log(data)
        }
        catch (er) {
            console.log(er)
        }
    }

export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" })
    try {
        console.log(data)
        const newPost = await uploadApi.uploadPost(data)
        console.log(newPost)
        dispatch({ type: "UPLOAD_SUCCESS" ,data:newPost.data})
    }
    catch (er) {
        console.log(er)
        dispatch({type:"UPLOAD_FAIL"})
    }
}