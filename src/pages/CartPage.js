import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const CartPage = (props) => {
  const { cartItems, onNavigate, onUpdateQuantity, onRemoveItem, cartItemCount } = props;

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      const discount = item.discount || 0;
      return total + (item.price * item.quantity * discount / 100);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar onNavigate={onNavigate} cartItemCount={cartItemCount} />
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button onClick={() => onNavigate('home')} className="continue-shopping-btn">
            Start Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar onNavigate={onNavigate} cartItemCount={cartItemCount} />

      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />

                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">PKR {item.price}</p>
                  {item.discount > 0 && (
                    <span className="cart-item-discount">{item.discount}% OFF</span>
                  )}
                </div>

                <div className="cart-item-quantity">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <div className="cart-item-subtotal">
                  <p>PKR {item.price * item.quantity}</p>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>PKR {calculateSubtotal()}</span>
            </div>

            {calculateDiscount() > 0 && (
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>- PKR {calculateDiscount().toFixed(0)}</span>
              </div>
            )}

            <div className="summary-row total">
              <span>Total:</span>
              <span>PKR {calculateTotal().toFixed(0)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => onNavigate('checkout')}
            >
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping-btn"
              onClick={() => onNavigate('home')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
