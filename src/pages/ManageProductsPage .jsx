import React, { useState, useMemo } from 'react'
import { fetchProducts, createProduct, updateProductById, deleteProductById } from '../services/api'
import { visuallyHidden } from '@mui/utils';
import { Typography, Button, TextField } from '@mui/material';
import { AddProductModal, DeleteModal } from '../components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setProducts, addProduct, updateProduct, deleteProduct } from '../redux/productSlice';
import { headCells } from "../utiles/data"
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ManageProductsPage = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')

  const { data: productData = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    onSuccess: (data) => {
      dispatch(setProducts(data));
    },
  });

  const filteredProducts = useMemo(() => {
    return productData.filter((product) =>
      ["name", "category", "description"].some((key) =>
        product[key]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, productData]);

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      dispatch(addProduct(newProduct));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }) => updateProductById(id, product),
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      dispatch(updateProduct(updatedProduct));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductById,
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      dispatch(deleteProduct(id));
      setDeleteId(null);
    },
  });


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredProducts.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...filteredProducts]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredProducts]
  );


  const handleOpen = (product = null) => {
    setEditProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setEditProduct(null);
    setOpen(false);
  };

  const handleSaveProduct = (filteredProducts) => {
    if (editProduct) {
      updateMutation.mutate({ id: editProduct.id, product: filteredProducts });
    } else {
      createMutation.mutate(filteredProducts);
    }
    handleClose();
  };

  const handleDeleteConfirm = () => {
    if (deleteId) deleteMutation.mutate(deleteId);
  };


  if (isLoading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography>Error fetching products</Typography>;
  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <DeleteModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDeleteConfirm} />
      <AddProductModal open={open} onClose={handleClose} onSave={handleSaveProduct} product={editProduct} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 1,
          mb: 2,
        }}
      >
        <Typography variant="h6">Manage Products</Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 1,
          mb: 2,
        }}>
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            sx={{ width: '14rem' }}
            value={searchQuery}
            placeholder='Name,Category,Desciption'
            onChange={(e) => setSearchQuery(e.target.value)}

          />

          <Button variant="contained" onClick={() => handleOpen()}>Add New Product</Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredProducts.length}
            />
            <TableBody>

              {visibleRows.length > 0 ? (visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}

                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell >{row.category}</TableCell>
                    <TableCell >{row.price}</TableCell>
                    <TableCell >{row.status}</TableCell>
                    <TableCell >{row.description}</TableCell>
                    <TableCell sx={{ display: "flex" }}>
                      <ModeEditIcon fontSize='small' onClick={() => handleOpen(row)} />
                      <DeleteOutlineIcon fontSize='small' onClick={() => setDeleteId(row.id)} />
                    </TableCell>
                  </TableRow>
                );
              })) : (<TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="subtitle1" color="textSecondary">
                    Product not found...
                  </Typography>
                </TableCell>
              </TableRow>)}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
export default ManageProductsPage 