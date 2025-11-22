import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (reviewData) => {
    const newReview = {
      id: Date.now(),
      ...reviewData,
      createdAt: new Date().toISOString(),
      helpful: 0,
    };
    setReviews([newReview, ...reviews]);
    return newReview;
  };

  const getReviewsByProduct = (productId) => {
    return reviews.filter(review => review.productId === parseInt(productId));
  };

  const getUserReviewForProduct = (productId, userEmail) => {
    return reviews.find(
      review => review.productId === parseInt(productId) && review.userEmail === userEmail
    );
  };

  const updateReview = (reviewId, updates) => {
    setReviews(reviews.map(review =>
      review.id === reviewId ? { ...review, ...updates } : review
    ));
  };

  const deleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  const markHelpful = (reviewId) => {
    setReviews(reviews.map(review =>
      review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
    ));
  };

  const getAverageRating = (productId) => {
    const productReviews = getReviewsByProduct(productId);
    if (productReviews.length === 0) return '0.0';
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  const getRatingDistribution = (productId) => {
    const productReviews = getReviewsByProduct(productId);
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getReviewsByProduct,
        getUserReviewForProduct,
        updateReview,
        deleteReview,
        markHelpful,
        getAverageRating,
        getRatingDistribution,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
