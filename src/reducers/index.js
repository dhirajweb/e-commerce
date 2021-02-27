import { combineReducers } from 'redux'
import cart from './cart'
import cartItems from './cartItems'

const rootReducer = combineReducers({
    cart,
    cartItems
});

export default rootReducer;