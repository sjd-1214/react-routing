import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import ProductReviews from '../components/ProductReviews';

const ProductDetailsPage = (props) => {
  const { product, onNavigate, onAddToCart, cartItemCount, relatedProducts } = props;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  if (!product) {
    return (
      <div>
        <Navbar onNavigate={onNavigate} cartItemCount={cartItemCount} />
        <div className="product-details-error">
          <h2>Product not found</h2>
          <button onClick={() => onNavigate('home')}>Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ ...product, quantity });
    }
  };

  const sampleReviews = [
    {
      id: 1,
      reviewer: 'Ahmed Khan',
      rating: 5,
      text: 'Amazing quality! The mask fits perfectly and looks exactly like the picture.',
      date: '2026-05-20'
    },
    {
      id: 2,
      reviewer: 'Fatima Ali',
      rating: 4,
      text: 'Good product, fast delivery. Slightly smaller than expected but still great.',
      date: '2026-05-18'
    },
    {
      id: 3,
      reviewer: 'Hassan Malik',
      rating: 5,
      text: 'Perfect for the party! Everyone loved it. Highly recommend.',
      date: '2026-05-15'
    }
  ];

  return (
    <div>
      <Navbar onNavigate={onNavigate} cartItemCount={cartItemCount} />

      <div className="product-details-container">
        <div className="breadcrumb">
          <button onClick={() => onNavigate('home')}>Home</button>
          <span> / </span>
          <span>{product.title}</span>
        </div>

        <div className="product-details-main">
          <div className="product-images">
            <div className="main-image">
              <img src={selectedImage || product.image} alt={product.title} />
            </div>
            <div className="thumbnail-gallery">
              <img
                src={product.image}
                alt={product.title}
                onClick={() => setSelectedImage(product.image)}
                className={selectedImage === product.image ? 'active' : ''}
              />
            </div>
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <div className="product-price-section">
              <span className="product-price">PKR {product.price}</span>
              {product.discount > 0 && (
                <span className="product-discount">{product.discount}% OFF</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>
                High-quality mask perfect for parties, events, and entertainment.
                Made from durable materials for long-lasting use. Comfortable fit
                for extended wear. Unique design that stands out from the crowd.
              </p>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        <ProductReviews
          reviews={sampleReviews}
          averageRating={4.7}
          totalReviews={sampleReviews.length}
        />

        {relatedProducts && relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.slice(0, 3).map((relProduct) => (
                <div key={relProduct.id} className="related-product-card">
                  <img src={relProduct.image} alt={relProduct.title} />
                  <h3>{relProduct.title}</h3>
                  <p>PKR {relProduct.price}</p>
                  <button onClick={() => onNavigate('product-details', relProduct)}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
