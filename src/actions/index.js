const ADD_TO_CART = 'ADD_TO_CART';
export const addToCart = (product_id, product_name, product_price, product_image) => ({
    type: ADD_TO_CART,
    product_id,
    product_name,
    product_price,
    product_image
});

const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const removeFromCart = (product_id) => ({
    type: REMOVE_FROM_CART,
    product_id
});