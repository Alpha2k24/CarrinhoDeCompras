import React,{createContext,useContext,useReducer,useState} from "react";
import { reducer } from "../data/reducer";
import { initialState } from "../data/reducer";

interface CartContextType {
    cart: any[];
    products: any[];
    addToCart: (product: any) => void;
    removeFromCart: (product: any) => void;
    setProducts: (products: any[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (product: any) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };
    const removeFromCart = (product: any) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    };

    const setProducts = (products: any[]) => {
        dispatch({ type: 'SET_PRODUCTS', payload: { products } });
    };

    return (
        <CartContext.Provider value={{ addToCart, removeFromCart, setProducts, cart: state.cart, products: state.products }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}