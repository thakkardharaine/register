module.exports = (sequelize, DataTypes, Product, Review) => {
  const productReview = sequelize.define('products_reviews', {
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product, 
        key: 'id',
      },
    },
    reviewId: {
      type: DataTypes.INTEGER,
      references: {
        model: Review, 
        key: 'id',
      },
    },
  });

  return productReview;
};

