import { useState } from 'react'
import './App.css'
import React from 'react'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { CartProvider } from './context/cartContext'
import Details from './pages/Deatils'

function App() {

  const routes = [
    {
      path: '/products',
      element: <Products />,
    },
    {
      path: '/cart',
      element: <Cart />,
    },
    {
      path: '/products/:id',
      element: <Details />,
    }
  ]

  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="/" element={<Products />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
