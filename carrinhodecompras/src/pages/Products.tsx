import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchProducts } from "../data/products"; // Importa o hook do contexto
import { useCart } from "../context/cartContext";

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
                setLoading(false);
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    // Função para verificar se o produto está no carrinho
    const isInCart = (product: any) => {
        return cart.some(item => item.id === product.id);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="mt-2">List of products will be displayed here.</p>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {products.map((product: any) => (
                        <motion.div key={product.id} className="border p-4 rounded-lg">
                            {isInCart(product) ? (
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => removeFromCart(product)}
                                >
                                    Remove from Cart
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            )}
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-cover mt-2 rounded"
                            />
                            <h2 className="font-bold">{product.title}</h2>
                            <p>{product.description}</p>
                            <p className="mt-2 font-bold">${product.price}</p>
                        </motion.div>
                    ))}
                </div>
            ) : loading ? (
                <motion.div transition={{ duration: 0.5, ease: "easeInOut" }} whileHover={{ scale: 1.2 }} className="mt-4 rounded-full animate-spin border-4 border-blue-500 border-t-transparent w-8 h-8"></motion.div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
}
