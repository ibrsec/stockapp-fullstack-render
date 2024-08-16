import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user:"",
    token:"",
    loading:false,
    error:false
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        fetchLoginStart: (state) => {
            state.loading = true;
        },
        loginSuccess : (state,{payload}) => {
            state.loading = false;
            state.user = payload.user.username;
            state.token = payload.token
        },
        registerSuccess : (state,{payload}) => {
            state.loading = false;
            state.token = payload.token;
            state.user = payload.data.username;
        },
        logoutSuccess : (state) => {
            state.user = "";
            state.token = "";
        },
        fetchLoginFail : (state)=>{
            state.loading = false;
            state.error = true;
        }

    }
})

export const  {fetchLoginStart,loginSuccess,fetchLoginFail,registerSuccess,logoutSuccess} = authSlice.actions;
export default authSlice.reducer;
