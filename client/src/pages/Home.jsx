import React, { useEffect } from "react";
import Chart from "../components/charts/Chart";
import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";
import {   Grid } from "@mui/material"; 
import Kpi from "../components/kpi/Kpi";
const Home = () => {
  const { purchases, sales } = useSelector((state) => state.stock);
  const {getDataApi,getAllDataGenericApi} = useStockRequest();

  useEffect(()=>{ 
    //with Promise all
    getAllDataGenericApi(['sales',"purchases"])
  },[])


  const totalSales = sales.map(item=>item.amount).reduce((sum,current)=>sum + current,0);
  const totalPurchases = purchases.map(item=>item.amount).reduce((sum,current)=>sum + current,0);
  const profit =totalSales - totalPurchases;


  return (
    <>
      <Kpi />
       


      <Grid container mt={10}   spacing={3}   justifyContent="center" 
  alignItems="center">
        <Chart datas={purchases} dataName="Purchases" />
        <Chart datas={sales} dataName="Sales" />
      </Grid>
    </>
  );
};

export default Home;
