import React from "react";
import { useCart } from "../context/cartContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function Cart() {
  const { removeFromCart, cart } = useCart();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-2">Your shopping cart is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="border p-4 rounded-lg"
              >
                <div className="flex flex-row justify-between mb-5">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#dc2626", // vermelho mais escuro
                    }}
                    transition={{ duration: 0.2 }}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove from Cart
                  </motion.button>

                  <Link className="flex items-center" to={`/products/${item.id}`}>
                    <Eye className="w-6 h-6 text-blue-500 mt-2" />
                  </Link>
                </div>

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
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
