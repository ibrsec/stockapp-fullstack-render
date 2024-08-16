import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useStockRequest from "../services/useStockRequest.js";
import { useSelector } from "react-redux";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SkeltonTable from "../components/SkeltonTable.jsx";
import DeletePurchase from "../components/purchases/DeletePurchase.jsx";
import PurchaseModal from "../components/purchases/PurchaseModal.jsx";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  ErrorMessage, 
  WarningMessage,
} from "../components/DataFetchMessages.jsx";
import { toastWarnNotify } from "../helper/ToastNotify.js";

// const rows = [
//   { id: 1, category: 'Snow', brand: 'Jon', name: 35 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 2, category: 'Lannister', brand: 'Cersei', name: 42 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 3, category: 'Lannister', brand: 'Jaime', name: 45 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 4, category: 'Stark', brand: 'Arya', name: 16 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 5, category: 'Targaryen', brand: 'Daenerys', name: null , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 6, category: 'Melisandre', brand: null, name: 150 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 7, category: 'Clifford', brand: 'Ferrara', name: 44 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 8, category: 'Frances', brand: 'Rossini', name: 36 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 9, category: 'Roxie', brand: 'Harvey', name: 65 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
// ];

export default function Purchases() {
  const { getDataApi, putEditApi } = useStockRequest();

  useEffect(() => {
    getDataApi("products");
    getDataApi("brands");
    getDataApi("firms");
    getDataApi("purchases");
  }, []);

  const { purchases, firms, brands, products } = useSelector(
    (state) => state.stock
  );
  const loading = useSelector((state) => state.stock.loading);
  const error = useSelector((state) => state.stock.error);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    firmId: "",
    // brandId: "",
    productId: "",
    quantity: "",
    price: "",
  });

  const [filterModel, setFilterModel] = useState({
    items: [],
    quickFilterValues: [""],
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  console.log(purchases);
  const columns = [
    { field: "createdAt", headerName: "Date", width: 150, flex: 1 },
    {
      field: "firmId",
      headerName: "Firm",
      width: 130,
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (value, row) => row?.firmId?._id,
      valueOptions: firms,
      getOptionLabel: (options) => options.name,
      getOptionValue: (options) => options._id,
    },
    {
      field: "brandId",
      headerName: "Brand",
      width: 130,
      flex: 1,
      editable: false,
      type: "singleSelect",
      valueGetter: (value, row) => row?.brandId?._id,
      valueOptions: brands,
      getOptionLabel: (options) => options.name,
      getOptionValue: (options) => options._id,
    },
    {
      field: "productId",
      headerName: "Product",
      width: 130,
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (value, row) => row?.productId?._id,
      valueOptions: products,
      getOptionLabel: (options) => options.name,
      getOptionValue: (options) => options._id,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      editable: true,
      width: 90,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      editable: true,
      width: 90,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 90,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="start"
          justifyContent="start"
          gap={1}
          flexWrap="nowrap"
        >
          <button
            style={{
              backgroundColor: "transparent",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(true);
              setValues({
                firmId: params?.row?.firmId?._id,
                brandId: params?.row?.brandId?._id,
                productId: params?.row?.productId?._id,
                quantity: params?.row?.quantity,
                price: params?.row?.price,
                _id: params?.row?._id,
              });
            }}
          >
            <BorderColorIcon />
          </button>
          <DeletePurchase id={params.row?._id} />
        </Box>
      ),
      sortable: false,
    },
  ];

  const handleProcessRowUpdate = (newRow, oldRow) => {
    console.log("after row edit=====>");
    console.log("newRow", newRow);
    console.log("oldRow", oldRow);

    const rowValues = {
      firmId: newRow?.firmId?._id || newRow?.firmId,
      brandId: newRow?.brandId?._id || newRow?.brandId,
      productId: newRow?.productId?._id || newRow?.productId,
      quantity: newRow?.quantity,
      price: newRow?.price, 

    };
    // console.log("rowvalues", rowValues);

    //is there any another empty field - while make put api call, we should give all fields
    if(Object.values(rowValues).some(item=> !item)){
      toastWarnNotify("There are another empty field! You should make the edit from edit button!");
    }else{
      putEditApi("purchases", newRow._id, rowValues);

    }
     


  };

  // const rows = purchases?.map((item) => {
  //   return {
  //     id: item._id,
  //     date: item.createdAt,
  //     firm: item.firmId?.name,
  //     brand: item.brandId?.name,
  //     product: item.productId?.name,
  //     quantity: item.quantity,
  //     price: item.price,
  //     amount: item.amount,
  //     actions: item,
  //   };
  // });
  // console.log(rows);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        marginy={2}
        onClick={() => setOpen(true)}
        sx={{ marginBottom: "25px" }}
      >
        NEW PURCHASE
      </Button>
      <PurchaseModal
        open={open}
        setOpen={setOpen}
        values={values}
        setValues={setValues}
      />

      {loading ? (
        <Box marginLeft={12} marginRight={12}>
          <SkeltonTable />
        </Box>
      )   : !purchases.length ? (
        <WarningMessage msg="There is no data to show!" />
      ) : (
        <>
          <DataGrid
            autoHeight
            rows={purchases}
            columns={columns}
            processRowUpdate={handleProcessRowUpdate}
            onProcessRowUpdateError={(error) => {
              /*console.log(error)*/
            }}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 100]}
            checkboxSelection
            // filterModel={filterModel}
            // onFilterModelChange={setFilterModel}
            // hideFooter
            // slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            slots={{ toolbar: GridToolbar }}
          />
        </>
      )}
      <Typography variant="p" color="lightsalmon">
        ** You can also edit from rows
      </Typography>
    </div>
  );
}
