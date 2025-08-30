import axios from 'axios'

const BASE_URL=import.meta.env.MODE=="development"?'http://localhost:5001/' : "https://collab-space-iota.vercel.app/";


export const axiosInstance=axios.create({
    withCredentials:true,
    baseURL:BASE_URL,
})