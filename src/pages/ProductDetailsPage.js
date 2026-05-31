import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ProductReviews from '../components/ProductReviews';

const ProductDetailsPage = (props) => {
  const { products, onAddToCart } = props;
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const relatedProducts = products.filter(p => p.id !== parseInt(id));
  const [quantity, setQuantity] = useState(1);
  // const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const navigate = useNavigate();

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
  }, [product]);



  if (!product) {
    return (
      <div className="product-details-error">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
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
      <div className="product-details-container">
        <div className="breadcrumb">
          <button onClick={() => navigate('/')}>Home</button>
          <span> / </span>
          <span>{product.title}</span>
        </div>

        <div className="product-details-main">
          <div className="product-images">
            <div className="main-image">
              <img src={product.image} alt={product.title} />
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
                  <button onClick={() => navigate("/productDetails/"+relProduct.id)}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
