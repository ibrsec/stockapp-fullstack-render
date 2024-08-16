import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export const ErrorMessage = ({msg}) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {msg}
    </Alert>
  );
};
export const SuccessMessage = ({msg}) => {
  return;

  <Alert severity="success">
    <AlertTitle>Success</AlertTitle>
    {msg}
  </Alert>;
};
export const WarningMessage = ({msg}) => {
  return (
    <Alert severity="warning">
      <AlertTitle>Warning</AlertTitle>
      {msg}
    </Alert>
  );
};
export const InfoMessage = ({msg}) => {
  return (
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      {msg}
    </Alert>
  );
};
 

const DataFetchMessages = () => {
  return (
    <div>DataFetchMessages</div>
  )
}

export default DataFetchMessages
