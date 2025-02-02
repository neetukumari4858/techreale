import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/api'
import { setProducts } from '../redux/productSlice';
import { useDispatch, } from 'react-redux';

const DashbordCard = () => {

  const dispatch = useDispatch()
  const { data: productData = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    onSuccess: (data) => {
      console.log("Fetched Products:", data);
      dispatch(setProducts(data));
    },
  });
  const inStockProduct = productData.filter((item) => item.status?.trim().toLowerCase() === ('in stock' || 'instock'));
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'flex-start', sm: 'center' },
      gap: 3,
      mb: 2,
    }}>
      <Card sx={{ display: 'flex', width: "12rem", mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography  >
              Total Products
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: 'text.secondary', textAlign: 'left' }}
            >
              {productData.length} Items
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Card sx={{ display: 'flex', width: "12rem", mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography >
              In Stock Products
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: 'text.secondary', textAlign: 'left' }}
            >
              {inStockProduct.length} Items
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
export default DashbordCard;
