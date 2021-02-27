const initialState = {
    data:[]
};

const cart = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        id:action.product_id,
                        name:action.product_name,
                        price:action.product_price,
                        image:action.product_image
                    }
                ]
            }
        case 'REMOVE_FROM_CART':
            const productsInCart = state.data.filter((product) => product.id !== action.product_id)
            return {
                ...state,
                data: productsInCart
            }
        default:
            return state
    }
}

export default cart;
