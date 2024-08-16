 
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import {
  fetchLoginFail,
  fetchLoginStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { deleteStockLogout } from "../features/stockSlice";

const useApiRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {axiosToken,axiosPublic} = useAxios();

  const loginApi = async (userData) => {     
     
    dispatch(fetchLoginStart());
    try {
      // const { data } = await axios.post(`${BASE_URL}/auth/login`, userData);
      const { data } = await axiosPublic.post(`/auth/login`, userData);

      console.log("loginapiden = ",data);
      dispatch(loginSuccess(data));
      toastSuccessNotify(data?.message);
      navigate("/stock"); 
    } catch (error) {
      toastErrorNotify("Login is failed!! - "+error?.response?.data?.message);
      dispatch(fetchLoginFail());
      console.log(error);
    }
  };

  const registerApi = async (userData) => {
    // {
    //     "username": "test",
    //     "password": "1234",
    //     "email": "test@site.com",
    //     "firstName": "test",
    //     "lastName": "test"
    //   }

    dispatch(fetchLoginStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/users`,
      //   userData
      // );
      const { data } = await axiosPublic.post(
        `/users`,
        userData
      );
      console.log("registerApiden = ",data);
      toastSuccessNotify(
        "Congratulations, your account has been successfully created - "+data?.message
      );
      dispatch(registerSuccess(data));
      navigate("/stock");
    } catch (error) {
      dispatch(fetchLoginFail());
      toastErrorNotify("Something went wrong. Registration failed!!");
      console.log(error);
      toastWarnNotify(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const logoutApi = async (token) => {
    dispatch(fetchLoginStart());
    try {
      // const options = {
      //   headers: {
      //     Authorization: "Token " + token,
      //   },
      // };
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BASE_URL}/auth/logout`,
      //   {
      //     headers: {
      //       Authorization: "Token " + token,
      //     },
      //   }
      // );
      const response = await axiosToken(`/auth/logout`);
      console.log("loginoutApiden = ",response);
      dispatch(logoutSuccess());
      dispatch(deleteStockLogout());
      toastSuccessNotify("You have been logged out!");
      navigate("/");
    } catch (error) {
      toastErrorNotify("Log out failed!!");
      dispatch(fetchLoginFail());
      console.log(error);
    }
  };

 

  return { loginApi, registerApi, logoutApi };
};

export default useApiRequests;

//aassdSDFdf123?
