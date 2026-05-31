const ProductReviews = (props) => {
  const { reviews = [], averageRating = 0, totalReviews = 0 } = props;

  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={star <= rating ? 'star filled' : 'star'}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={star <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="average-rating">
          <StarRating rating={Math.round(averageRating)} />
          <span className="rating-text">{averageRating.toFixed(1)} out of 5 ({totalReviews} reviews)</span>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="reviewer-name">{review.reviewer}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <StarRating rating={review.rating} />
              <p className="review-text">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
