import axios from "axios";

const API = axios.create({baseURL:"http://localhost:8080"})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });
export const getUser = (userId) => API.get(`/user/${userId}`)
export const updateUser = (id,formdata) => API.put(`/user/${id}`,formdata)

export const getAllUser  = () => API.get('/user')

export const followuser = (id,data) => API.put(`/user/${id}/follow`,data)
export const unfollowuser = (id,data) => API.put(`/user/${id}/unfollow`,data)