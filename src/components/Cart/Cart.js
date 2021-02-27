import React, { useState, useEffect } from 'react'
import {List,
ListItem, ListItemAvatar, Avatar, ListItemText,
Divider, Dialog, DialogTitle } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { removeFromCart, removeProductId } from '../../actions'

const useStyles = makeStyles((theme) => ({
    rightNav: {
        flexGrow: 1,
        textAlign: 'right'
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Cart = (props) => {
    const classes = useStyles();
    const [cartTotal, setCartTotal] = useState(0)
    const [cartChanged, setCartChanged] = useState(false)

    const calculateCartTotal = async () => {
        if(props.productsInCart.length > 0) {
            let total = props.productsInCart.reduce((acc, item) => (
                acc + item.price
              ), 0).toFixed(2)
            setCartTotal(total)
        }
    }

    const deleteFromCart = async (productId) => {
        if(productId) {
            await props.dispatch(removeFromCart(productId))
            props.dispatch(removeProductId(productId))
            setCartChanged(!cartChanged)
        }
    }

    useEffect(() => {
        calculateCartTotal();
    }, [cartChanged])// eslint-disable-line
    return (
        <div>
            <Dialog onClose={() => props.close(false)} aria-labelledby="simple-dialog-title" open={props.open}>
                <div style={{padding: '20px', paddingLeft: '0px',paddingTop: '0px'}}>
                    <DialogTitle id="simple-dialog-title">Cart Items</DialogTitle>
                    {props.productsInCart.length > 0?
                    <List className={classes.root}>
                    {props.productsInCart.map((product) => (
                        <div key={product.id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img style={{height: '100%', width: '100%'}} src={product.image} alt={product.title}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={product.name} secondary={'$'+product.price} />
                                <ClearIcon style={{cursor: 'pointer', marginLeft: '20px'}} onClick={() => deleteFromCart(product.id)}/>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                    ))}
                    </List>:<p style={{margin: '20px', fontSize: '15px'}}>No products in cart</p>}
                    <Typography variant="h6" style={{textAlign: 'right'}} className={classes.title}>
                        {props.productsInCart.length > 0?'Cart total: $'+cartTotal:'Cart total: $0'}
                    </Typography>
                </div>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => ({
    productsInCart: state.cart.data,
})

export default connect(mapStateToProps)(Cart);
