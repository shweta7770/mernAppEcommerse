import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Product({name}) {
  return (
    <Card sx={{ maxWidth: 345 , border: '1px solid black'  }} >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From $8/month
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 180 }}
        image="https://bitetoothpastebits.com/cdn/shop/files/pc-tpb-ff-4oz-mint-no-bg_570x.png?v=1701372643"
        title="green iguana"
      />

      <CardActions style={{backgroundColor: "#000000"}}>
        <Button size="small" style={{ color:"white" , textAlign:"center"}}>ADD TO BAG</Button>
      </CardActions>
    </Card>
  );
}