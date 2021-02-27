const initialState = {
    data:[]
};

const cartItems = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT_ID':
            return {
                ...state,
                data: [...state.data,action.product_id]
            }
        case 'REMOVE_PRODUCT_ID':
            const productsInCart = state.data.filter((id) => id !== action.product_id)
            return {
                ...state,
                data: productsInCart
            }
        default:
            return state
    }
}

export default cartItems;
