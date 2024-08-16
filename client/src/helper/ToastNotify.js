import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastWarnNotify = (msg) => { 
  toast.warn(msg, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastSuccessNotify = (msg) => { 
  toast.success(msg, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastErrorNotify = (msg) => { 
  toast.error(msg, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};


export const toastLoading = (msg) => {
  const id = toast.loading("Please wait...",)
  return id;
}

export const taostStopLoading = (id,type,msg)=> {
  toast.update(id, { render: msg, type: type, isLoading: false,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined, });
}

