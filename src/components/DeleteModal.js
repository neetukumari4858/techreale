import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
};

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="delete-modal">
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Are you sure you want to delete this product?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
