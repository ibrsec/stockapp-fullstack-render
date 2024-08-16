import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  brands:[],
  products:[],
  purchases:[],
  sales:[],
  categories:[],
  loading: false,
  error: false,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStockStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    stockSuccess:(state,{payload})=>{
        state.loading = false;
        state[payload.path] = payload.data.data;
    },
    successWitoutPayload: (state)=> {
        state.loading = false; 
    },
    // deleteSuccess:(state,{payload})=> {
    //     state.loading = false;
    //     // state.firms = state.firms.filter(item => item._id !== payload); 
    // },
    // postNewDataSuccess:(state)=>{
    //     state.loading = false;
    // },
    fetchStockFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteStockLogout : (state)=>{
      state.firms = []
      state.brands=[]
      state.products=[]
      state.categories=[]
      state.purchases=[]
      state.sales=[]
      
    },
    stockPromiseAllSuccess : (state,{payload:{paths,datas}})=>{
      state.loading = false;
      paths?.forEach((path,i)=>{
        state[path]=datas[i];
      }) 
    }
  },
});

export const {fetchStockStart,fetchStockFail,stockSuccess,successWitoutPayload,deleteStockLogout,stockPromiseAllSuccess} = stockSlice.actions;
export default stockSlice.reducer;


 
 
