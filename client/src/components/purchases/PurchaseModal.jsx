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

const PurchaseModal = ({ open, setOpen, values, setValues }) => {
  const { postNewDataApi, putEditApi } = useStockRequest();
  const { firms, brands, products } = useSelector((state) => state.stock);

  const handleClose = () => {
    setValues({
      firmId: "",
      // brandId: "",
      productId: "",
      quantity: "",
      price: "",
    });
    setOpen(false);

    toastWarnNotify("Adding new purchase is Cancelled");
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
      putEditApi("purchases", values._id, values);
    } else {
      postNewDataApi("purchases", values);
    }

    //? - [x]  close the modal
    setOpen(false);

    //? [x] -reset form
    setValues({
      firmId: "",
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
            <FormControl fullWidth>
              <InputLabel id="purchase-firm-new-label">Firms</InputLabel>
              <Select
                labelId="purchase-firm-select-label"
                id="purchase-firm-select"
                label="Firm"
                name="firmId"
                value={values.firmId}
                onChange={handleChange}
                required
              >
                {firms?.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl fullWidth>
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
                {brands?.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
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
                {products?.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
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
              {values._id ? "UPDATE PURCHASE" : "ADD PURCHASE"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PurchaseModal;
