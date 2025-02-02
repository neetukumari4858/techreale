import * as React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
import { authApi } from '../services/api';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const response = await authApi.post('/', { email, password });
            localStorage.setItem('token', String(response.data.data.accessToken))
            enqueueSnackbar('Login successfuly!', { variant: 'success' });
            navigate("/dashboard");
        } catch (error) {
            throw error;
        }
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ m: 10, width: '28ch', border: '1px solid gainsboro ', p: 4 }}
        >
            <Stack spacing={2} >
                <Typography variant='h5'>Login</Typography>
                <TextField label="Email" type='email' variant="outlined" placeholder='admin@gmail.com' fullWidth size={'small'} {...register("email", {
                    required: 'Email is required'
                })} error={!!errors.email} helperText={errors.email?.message} />

                <TextField label="Password" variant="outlined" placeholder='123456' fullWidth size={'small'} {...register("password", {
                    required: 'Password is required'
                })} error={!!errors.password} helperText={errors.password?.message} />
                <Button variant="contained" type='submit' fullWidth>Login</Button>
            </Stack>
        </Box>
    );
}
export default Login;