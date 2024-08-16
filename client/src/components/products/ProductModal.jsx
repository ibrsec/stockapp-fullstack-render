import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal"; 
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"; 
import useStockRequest from "../../services/useStockRequest";
import { toastWarnNotify } from "../../helper/ToastNotify";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductModal = ({ open, setOpen, values, setValues }) => {
  const { postNewDataApi, putEditApi } = useStockRequest();
  const categories = useSelector((state) => state.stock.categories);
  const brands = useSelector((state) => state.stock.brands);


  const handleClose = () => {
    setValues({
        categoryId:"",
        brandId:"",
        name: "", 
    });
    setOpen(false);

    toastWarnNotify("Adding new product is Cancelled");
  };
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    //? - [x]  form and values
    console.log(values);

    //? - [x]  post new firm api write-call
    //? - [x]  get firms after post
    //? - [x]  show the result error success
    if (values._id) {
      putEditApi("products",values._id, values);
    } else {
      postNewDataApi("products", values);
    }

    //? - [x]  close the modal
    setOpen(false);

    //? [x] -reset form
    setValues({
      categoryId:"",
      brandId:"",
      name: "", 
  });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      name="categoryId"
                      value={values.categoryId}
                      onChange={handleChange}
                      required

                    >
                        {categories?.map((item,index)=>(
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>

                        ))} 
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Brand"
                      name="brandId"
                      value={values.brandId}
                      onChange={handleChange}
                      required
                    >
                        {brands?.map((item,index)=>(
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>

                        ))} 
                    </Select>
                  </FormControl>
                  <TextField
                    label="Product Name"
                    required
                    name="name"
                    id="name"
                    type="text"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange} 
                    
                  /> 
            <Button type="submit" variant="contained" size="large">
              {values._id ? "UPDATE PRODUCT" : "ADD PRODUCT"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductModal;
