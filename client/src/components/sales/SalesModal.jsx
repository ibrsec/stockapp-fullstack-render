import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

const SaleModal = ({ open, setOpen, values, setValues }) => {
  const { postNewDataApi, putEditApi } = useStockRequest();
  const {brands,products} = useSelector((state) => state.stock);
   
  const handleClose = () => {
    setValues({
      // brandId: "",
      productId: "",
      quantity: "",
      price: "",
    });
    setOpen(false);

    toastWarnNotify("Adding new sale is Cancelled");
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
      putEditApi("sales", values._id, values);
    } else {
      postNewDataApi("sales", values);
    }

    //? - [x]  close the modal
    setOpen(false);

    //? [x] -reset form
    setValues({
      // brandId: "",
      productId: "",
      quantity: "",
      price: "",
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
            {/* <FormControl fullWidth>
              <InputLabel id="purchase-brand-new-label">Brand</InputLabel>
              <Select
                labelId="purchase-brand-new-label"
                id="purchase-brand-new"
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
            </FormControl> */}
            <FormControl fullWidth>
              <InputLabel id="purchase-product-new-label">Product</InputLabel>
              <Select
                labelId="purchase-product-new-label"
                id="purchase-product-new"
                label="Product"
                name="productId"
                value={values.productId}
                onChange={handleChange}
                required
              >
                {products?.map((item,index)=>(
                  <MenuItem key={index} value={item._id}>{item.name}</MenuItem>

                ))}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              required
              name="quantity"
              id="quantity"
              type="text"
              variant="outlined"
              value={values.quantity}
              onChange={handleChange}

            />
            <TextField
              label="Price"
              required
              name="price"
              id="price"
              type="text"
              variant="outlined"
              value={values.price}
              onChange={handleChange}

            />
            <Button type="submit" variant="contained" size="large">
              {values._id ? "UPDATE SALE" : "ADD SALE"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SaleModal;
