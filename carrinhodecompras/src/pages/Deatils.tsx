import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { ArrowBigLeft } from "lucide-react";

export default function Details() {
    const { id } = useParams();
    const { products } = useCart();
    const product = products.find((item) => item.id === Number(id));
    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold">Product Details</h1>
            <p className="mt-2">This page will display detailed information about a selected product.</p>
            <div className="mt-4 mb-4">
                <Link to="/products">
                    <ArrowBigLeft className="w-9 h-9 text-blue-500" />
                </Link>
            </div>
            {product ? (
                <div className="mt-4 flex flex-col items-center border p-4 rounded-lg w-1/2">
                    <img src={product.image} alt={product.title} className="w-48 h-48 object-cover mb-4 rounded" />
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    <p className="mt-2">{product.description}</p>
                    <p className="mt-2 font-bold">${product.price}</p>
                </div>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
}