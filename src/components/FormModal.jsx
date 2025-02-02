import React from "react"
import { Button, IconButton, Stack, TextField,Box, Typography,Modal } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddProductModal = ({ open, onClose, onSave, product }) => {

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      status: ''
    }
  })
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (product) {
      reset(product);
    } else {
      reset({
        name: '',
        description: '',
        price: '',
        category: '',
        status: ''
      });
    }
  }, [product, reset]);
  const onSubmit = async (data) => {
    onSave(data);
    product ? enqueueSnackbar('Updated successfuly!', { variant: 'success' }) : enqueueSnackbar('Added successfuly!', { variant: 'success' })
    onClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={2} >
              <Typography variant='h5'>{product ? "Update Product" : "Add New Product"}</Typography>
              <TextField label="Name" type='text' variant="outlined" placeholder='Enter Name...' fullWidth size={'small'} {...register("name", {
                required: 'Name is required'
              })} error={!!errors.name} helperText={errors.name?.message} />
              <TextField label="Description" type='text' variant="outlined" placeholder='Enter description...' fullWidth size={'small'} {...register("description", {
                required: 'Description is required'
              })} error={!!errors.description} helperText={errors.description?.message} />
              <TextField label="Price" variant="outlined" placeholder='Enter Price' fullWidth size={'small'} {...register("price", {
                required: 'Price is required'
              })} error={!!errors.price} helperText={errors.price?.message} />
              <TextField label="Category" variant="outlined" placeholder='Enter Category' fullWidth size={'small'} {...register("category", {
                required: 'category is required'
              })} error={!!errors.category} helperText={errors.category?.message} />
              <TextField label="Status" variant="outlined" placeholder='Enter Status' fullWidth size={'small'} {...register("status", {
                required: 'Status is required'
              })} error={!!errors.status} helperText={errors.status?.message} />
              <Button variant="contained" type='submit' fullWidth>{product ? "Update Product" : "Add Product"}</Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
export default AddProductModal;