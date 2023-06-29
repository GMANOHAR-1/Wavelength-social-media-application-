const postReducer = (
    state = { posts: [], loading: false, error: false, uplaoding: false },
    action
) => {
    switch (action.type) {
        case "UPLOAD_START":
            return { ...state, uplaoding: true, error: false }
        case "UPLOAD_SUCCESS":
            return { ...state, posts: [action.data, ...state.posts], uplaoding: false, error: false }
        case "UPLOAD_FAIL":
            return { ...state, uploading: false, error: true }
        case "RETREIVING_START":
            return { ...state, loading: true, error: false };
        case "RETRIEVING_SUCCESS":
            return { ...state, posts: action.data, loading: false, error: false };
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: true };

        default:
            return state
    }
}

export default postReducer