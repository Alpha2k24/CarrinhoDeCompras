// src/data/initialState.ts
import { Product } from "./products"; 

export const initialState: {
  products: Product[];
  cart: Product[];
} = {
  products: [],
  cart: [],
};


export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            console.log('Adding to cart:', action.payload);
            console.log('Current cart state:', state.cart);
            return {
                ...state,
                cart: [...state.cart, action.payload],
                products: state.products.map((product: any) =>
                    product.id === action.payload.id ? { ...product, inCart: true } : product
                ),
            };
        case 'REMOVE_FROM_CART':
            console.log('Removing from cart:', action.payload);
            console.log('Current cart state:', state.cart);
            return {
                ...state,
                cart: state.cart.filter((item: any) => item.id !== action.payload.id),
                products: state.products.map((product: any) =>
                    product.id === action.payload.id ? { ...product, inCart: false } : product
                ),
            };
        case 'SET_PRODUCTS':
            console.log('Setting products:', action.payload.products);
            console.log('Current products state:', state.products);
            return {
                ...state,
                products: action.payload.products,
            };
        default:
            return state;
    }
}

