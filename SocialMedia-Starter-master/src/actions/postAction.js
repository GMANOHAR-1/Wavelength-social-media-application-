import * as postApi from '../api/postRequest'
 
export const getTimelineposts = (id) => async (dispatch) => {
    
   
    try {
        dispatch({ type: "RETREIVING_START" })
        const { data } = await postApi.gettimelineposts(id);
     
        dispatch({ type: "RETRIEVING_SUCCESS", data: data });
    }
    catch (err) {
        dispatch({ type: "RETRIEVING_FAIL" })
        console.log(err);
    }
}