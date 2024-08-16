


import axios from 'axios'
import { useSelector } from 'react-redux'

const useAxios = () => {
    const token = useSelector((state)=> state.auth.token)
    // const baseUrl = process.env.REACT_APP_BASE_URL;
    const baseUrl = '/api/v1';
    const axiosToken = axios.create({
        baseURL: baseUrl,
        headers:{Authorization: `Token ${token}`}
    })
    const axiosPublic = axios.create({
        baseURL: baseUrl
    })
  return {axiosToken,axiosPublic}
}

export default useAxios