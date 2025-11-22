import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const initialProducts = allProducts;
// Products now loaded from external file

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      rating: 0,
      isNew: true,
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, ...productData } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
