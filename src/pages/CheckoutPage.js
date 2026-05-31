import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const CheckoutPage = (props) => {
  const { cartItems, onNavigate, cartItemCount } = props;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const discount = item.discount || 0;
      return total + (itemTotal - (itemTotal * discount / 100));
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Placed:', {
      customerInfo: formData,
      items: cartItems,
      total: calculateTotal()
    });
    alert('Order placed successfully! Thank you for shopping with us.');
    onNavigate('home');
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar onNavigate={onNavigate} cartItemCount={cartItemCount} />
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add items to your cart before checking out.</p>
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

      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-section">
              <h2>Shipping Information</h2>

              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment Method</h2>

              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <span>Cash on Delivery</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <span>Credit/Debit Card (Coming Soon)</span>
                </label>
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>

          <div className="order-summary-checkout">
            <h2>Order Summary</h2>

            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.title} />
                  <div className="order-item-info">
                    <h4>{item.title}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">PKR {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Total:</span>
              <span className="total-amount">PKR {calculateTotal().toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
