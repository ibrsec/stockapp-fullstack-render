import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Form, Formik } from "formik";
import { TextField } from "@mui/material";
import { object, string } from "yup";
import useStockRequest from "../../services/useStockRequest";
import { toastWarnNotify } from "../../helper/ToastNotify";

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

const NewFirmModal = ({ open, setOpen, values, setValues }) => {
  const { postNewDataApi, putEditApi } = useStockRequest();

  const handleClose = () => {
    setValues({
      name: "",
      phone: "",
      address: "",
      image: "",
    });
    setOpen(false);

    toastWarnNotify("Adding new firm is Cancelled");
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
      putEditApi("firms",values._id, values);
    } else {
      postNewDataApi("firms", values);
    }

    //? - [x]  close the modal
    setOpen(false);

    //? [x] -reset form
    setValues({
      name: "",
      phone: "",
      address: "",
      image: "",
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
            <TextField
              label="Firm Name"
              required
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              required
              name="phone"
              id="phone"
              type="text"
              variant="outlined"
              value={values.phone}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              required
              name="address"
              id="address"
              type="text"
              variant="outlined"
              value={values.address}
              onChange={handleChange}
            />
            <TextField
              label="Image"
              required
              name="image"
              id="image"
              type="text"
              variant="outlined"
              value={values.image}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" size="large">
              {values._id ? "UPDATE FIRM" : "ADD FIRM"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default NewFirmModal;
