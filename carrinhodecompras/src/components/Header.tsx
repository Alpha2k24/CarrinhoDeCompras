import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">My Shopping App</h1>
            <nav className="flex space-x-4">
                <ul className="flex space-x-4">
                    <motion.li transition={{ duration: 0.2 }} whileHover={{ scale: 1.1, color: "#fbbf24" }}><Link to="/products">Products</Link></motion.li>
                    <motion.li transition={{ duration: 0.2 }} whileHover={{ scale: 1.1, color: "#fbbf24" }}><Link to="/cart">Cart</Link></motion.li>
                </ul>
            </nav>
        </header>
    );
}