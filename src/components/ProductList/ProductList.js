import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './ProductList.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const ProductList = () => {
    const [productList, setProductList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [filter, setFilter] = useState('all')
    const classes = useStyles();
    const fetchProducts = () => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(result => {
            setProductList(result)
        })
    }

    const fetchCategories = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(res=>setCategoryList(res))
    }

    const titleTextStyle = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',  
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '3.1rem',
        fontWeight: 'bold'
    }

    const descTextStyle = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',  
        WebkitLineClamp: 4,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '4.9rem',
        marginTop: '10px'
    }

    const handleFilterChange = (filterVal) => {
        setFilter(filterVal)
        if(filterVal !== filter && filterVal !== 'all') {
            fetch('https://fakestoreapi.com/products/category/'+filterVal)
            .then(res=>res.json())
            .then(result=>setProductList(result))
        }
    }

    useEffect(() => {
        if(filter === 'all') {
            fetchProducts();
            fetchCategories();
        }
    }, [filter])

    return (
        <div>
            <div>
                <Typography variant="subtitle1" style={{fontWeight: 'bold', margin: '20px 24px', display:'inline-block',float:'left'}}>
                    {'Products('+productList.length+')'}
                </Typography>
                <div className='filterDiv' style={{display: 'inline-block', marginRight: '24px'}}>
                    <Typography variant="subtitle2" style={{display: 'inline', marginRight: '10px', color: '#9c27b0'}}>
                        Filter by category
                    </Typography>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={filter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        displayEmpty
                        className={classes.selectEmpty}
                        >
                        <MenuItem value="all">
                            All
                        </MenuItem>
                        {categoryList.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <Grid container spacing={3} style={{margin: '0', padding: '10px', width: '100%'}}>
            {productList.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card style={{padding: '10px'}}>
                <CardActionArea>
                    <div style={{height: '150px'}}>
                        <CardMedia
                        component="img"
                        alt="product"
                        style={{ objectFit: 'contain'}}
                        height="100%"
                        width="100%"
                        image={product.image}
                        title={product.title}
                        />
                    </div>
                    <CardContent>
                    <Typography gutterBottom variant="subtitle1" style={titleTextStyle}>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={descTextStyle}>
                        {product.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid item xs={6} style={{textAlign: 'left'}}>
                        <Button size="small" color="primary">
                        ADD TO CART
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" style={{textAlign: 'right'}}>
                            {'$'+product.price}
                        </Typography>
                    </Grid>
                </CardActions>
                </Card>
                </Grid>
            ))}
            </Grid>
        </div>
    )
}

export default ProductList
