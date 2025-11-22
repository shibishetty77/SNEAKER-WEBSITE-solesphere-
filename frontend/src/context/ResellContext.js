import React, { createContext, useContext, useState, useEffect } from 'react';

const ResellContext = createContext();

export const useResell = () => {
  const context = useContext(ResellContext);
  if (!context) {
    throw new Error('useResell must be used within a ResellProvider');
  }
  return context;
};

const initialListings = [
  {
    id: 1,
    name: 'Air Jordan 1 Chicago',
    brand: 'Nike',
    size: '10',
    condition: 'Like New',
    price: 24999,
    originalPrice: 16999,
    seller: 'Sneaker Collector',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500',
    description: 'Worn once, perfect condition. Comes with original box.',
    soldOut: false,
  },
  {
    id: 2,
    name: 'Yeezy Boost 350 Zebra',
    brand: 'Adidas',
    size: '9.5',
    condition: 'Used - Good',
    price: 21999,
    originalPrice: 19999,
    seller: 'YeezyMaster',
    image: 'https://images.unsplash.com/photo-1580906853149-f82f7601d205?w=500',
    description: 'Worn several times, well maintained. Minor creasing.',
    soldOut: false,
  },
  {
    id: 3,
    name: 'Nike Dunk Low Panda',
    brand: 'Nike',
    size: '11',
    condition: 'Brand New',
    price: 15999,
    originalPrice: 9999,
    seller: 'DunkCollector',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500',
    description: 'Deadstock, never worn. Original packaging intact.',
    soldOut: false,
  },
  {
    id: 4,
    name: 'Air Max 97 Silver Bullet',
    brand: 'Nike',
    size: '10.5',
    condition: 'Used - Excellent',
    price: 18999,
    originalPrice: 15999,
    seller: 'MaxCollector',
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500',
    description: 'Excellent condition, minimal wear. Cleaned professionally.',
    soldOut: false,
  },
];

export const ResellProvider = ({ children }) => {
  const [listings, setListings] = useState(() => {
    const savedListings = localStorage.getItem('resellListings');
    return savedListings ? JSON.parse(savedListings) : initialListings;
  });

  useEffect(() => {
    localStorage.setItem('resellListings', JSON.stringify(listings));
  }, [listings]);

  const addListing = (listingData) => {
    const newListing = {
      id: Date.now(),
      ...listingData,
      soldOut: false,
    };
    setListings([newListing, ...listings]);
    return newListing;
  };

  const buyListing = (listingId) => {
    setListings(listings.map(listing =>
      listing.id === listingId ? { ...listing, soldOut: true } : listing
    ));
  };

  const getAvailableListings = () => {
    return listings.filter(listing => !listing.soldOut);
  };

  const getListingById = (id) => {
    return listings.find(listing => listing.id === parseInt(id));
  };

  return (
    <ResellContext.Provider
      value={{
        listings,
        addListing,
        buyListing,
        getAvailableListings,
        getListingById,
      }}
    >
      {children}
    </ResellContext.Provider>
  );
};
