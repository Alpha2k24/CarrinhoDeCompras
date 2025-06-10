import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "../data/products";
import { useCart } from "../context/cartContext";
import { Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products() {
  const { products, addToCart, removeFromCart, setProducts, cart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const isInCart = (product: any) => cart.some((item) => item.id === product.id);

  return (
    <div className="p-8 px-20">
      <h1 className="text-2xl font-bold">Products</h1>
      <p className="mt-2">List of products will be displayed here.</p>

      {loading ? (
        <motion.div
          className="mt-8 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="rounded-full animate-spin border-4 border-blue-500 border-t-transparent w-8 h-8"
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      ) : products.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
          layout
        >
          <AnimatePresence>
            {products.map((product: any) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border p-4 rounded-lg hover:shadow-lg"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex flex-row justify-between mb-5">
                  {isInCart(product) ? (
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => removeFromCart(product)}
                    >
                      Remove
                    </motion.button>
                  ) : (
                    <motion.div
                      whileTap={{ scale: 0.8, rotate: -10 }}
                      className="cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-6 h-6 text-blue-500 mt-2" />
                    </motion.div>
                  )}

                  <Link className="flex items-center" to={`/products/${product.id}`}>
                    <Eye className="w-6 h-6 text-blue-500 mt-2" />
                  </Link>
                </div>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mt-2 rounded"
                />
                <h2 className="font-bold">{product.title}</h2>
                <p className="mt-2 font-bold">${product.price}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="mt-4">No products found.</p>
      )}
    </div>
  );
}
