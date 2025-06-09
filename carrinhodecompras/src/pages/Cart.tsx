import React from "react";
import { useCart } from "../context/cartContext";
import { motion } from "framer-motion";

export default function Cart() {
  const { removeFromCart, cart } = useCart();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-2">Your shopping cart is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {cart.map((item) => (
            <motion.div key={item.id} className="border p-4 rounded-lg">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => removeFromCart(item)}
              >
                Remove from Cart
              </button>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover mt-2 rounded"
              />
              <h2 className="font-bold">{item.title}</h2>
              <p>{item.description}</p>
              <p className="mt-2 font-bold">${item.price}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}