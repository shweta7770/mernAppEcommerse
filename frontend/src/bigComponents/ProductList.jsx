import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Product from '../components/Product';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProductList() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
        <Grid item xs={3}>
         <Product name={"TOOTHPASTE BITS FLUORIDE-FREE"} />
        </Grid>
        <Grid item xs={3}>
        <Product name={"DEODORANT"} />
        </Grid>
        <Grid item xs={3}>
        <Product name={"MOUTHWASH BITS"} />
        </Grid>
        <Grid item xs={3}>
        <Product name={"THE DAILY HABITS KIT"} />
        </Grid>
      </Grid>
    </Box>
  );
}