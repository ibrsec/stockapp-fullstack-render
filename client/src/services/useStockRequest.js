import { useDispatch } from "react-redux";
import useAxios from "./useAxios" 
import { fetchStockFail, fetchStockStart, stockSuccess, successWitoutPayload,stockPromiseAllSuccess } from "../features/stockSlice";
import {
    taostStopLoading, 
    toastLoading, 
  } from "../helper/ToastNotify";
import { logoutSuccess } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
 
const useStockRequest = () => {
    const {axiosToken} = useAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDataApi = async (path) => {
        const idLoading = toastLoading(`Getting the ${path}...` );
        try {
            dispatch(fetchStockStart())
            const {data} = await axiosToken("/"+path)
            console.log(`useStocktan getData(${path})= `,data);
            dispatch(stockSuccess({data,path}))
            taostStopLoading(idLoading,"success",data?.message) 
        } catch (error) {
            // toastErrorNotify("Error! Couldn't Get Firms");
            taostStopLoading(idLoading,"error","Error! Datas couldn't be loaded!"+ " - "+error?.response?.data?.message) 

            dispatch(fetchStockFail())
            console.log(error);
            autoLogout(error,dispatch,navigate);
            
        }
    }
    const deleteSelectedDataApi = async (path,id) => {
        const idLoading = toastLoading(`Deleting...` );
        try {
            dispatch(fetchStockStart())
            const {data} = await axiosToken.delete(`${path}/${id}` )
            console.log(`useStocktan delete Data(${path})= [response empty - success]`,data);
            dispatch(successWitoutPayload())
            // toastSuccessNotify(`Deleted Successfully!`);
            taostStopLoading(idLoading,"success","Deleted Successfully!") 
            getDataApi(path);
        } catch (error) { 
            // toastErrorNotify("Error! The Firm couldn't be deleted !");
            taostStopLoading(idLoading,"error","Error! Data couldn't be deleted! - "+error?.response?.data?.message) 

            dispatch(fetchStockFail())
            console.log(error);
            autoLogout(error,dispatch,navigate);
        }
    }
    const postNewDataApi = async (path,firmData) => { 
        const idLoading = toastLoading("Creating...!");
        try {
            dispatch(fetchStockStart())
            const {data} = await axiosToken.post(path,firmData)
            console.log(`useStocktan postnewData(${path})= `,data);
            dispatch(successWitoutPayload())
            // toastSuccessNotify(`New Firm is added Successfully!`);
            getDataApi(path);
            taostStopLoading(idLoading,"success",data?.message) 
        } catch (error) {
            taostStopLoading(idLoading,"error","Error! The New data couldn't be added ! - "+error?.response?.data?.message) 
            // toastErrorNotify("Error! The New Firm couldn't be added !");
            dispatch(fetchStockFail())
            console.log(error);
            autoLogout(error,dispatch,navigate);
        }
    }
    const putEditApi = async (path,id,firmData) => {
        const idLoading = toastLoading(`Editting...` );
        try {
            dispatch(fetchStockStart())
            const {data} = await axiosToken.put(`${path}/${id}`,firmData)
            console.log(`useStocktan putEditData(${path})= `,data);
            dispatch(successWitoutPayload())
            // toastSuccessNotify(`The Firm is editted Successfully!`);
            taostStopLoading(idLoading,"success",data?.message) 
            
            getDataApi(path); 
        } catch (error) {
            // toastErrorNotify("Error! The New Firm couldn't be editted !");
            taostStopLoading(idLoading,"error","Error! Data couldn't be editted! - "+error?.response?.data?.message) 

            dispatch(fetchStockFail())
            console.log(error);
            autoLogout(error,dispatch,navigate);
        }
    }


    const getAllDataGenericApi = async (paths) => {
        const idLoading = toastLoading(`Getting the ${paths?.join(", ")}...` );
        try {
            dispatch(fetchStockStart())
            const res = await Promise.all(
                paths?.map(item=>axiosToken(item))
                )

            
            const datas = res.map(item=>item?.data?.data)
            console.log(`useStocktan promise all (${paths?.join(", ")})= `,res);
            console.log(paths);
            console.log(datas);
            dispatch(stockPromiseAllSuccess({datas,paths}))
            taostStopLoading(idLoading,"success",`${paths} are loaded successfully!`) 
        } catch (error) {
            // toastErrorNotify("Error! Couldn't Get Firms");
            taostStopLoading(idLoading,"error","Error! Datas couldn't be loaded!"+ " - "+paths.join(", ")) 

            dispatch(fetchStockFail())
            console.log(error);
            autoLogout(error,dispatch,navigate);
            
        }
    }
    return { getDataApi,deleteSelectedDataApi,postNewDataApi,putEditApi,getAllDataGenericApi }
}

export default useStockRequest


const autoLogout = (error,dispatch,navigate) => {
    if(error?.response?.status === 403){
        dispatch(logoutSuccess());
        navigate('/')
    }
}