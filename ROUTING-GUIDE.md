# React Routing Implementation Guide

This guide will help you implement React Router in the Two-Faced e-commerce project.

## Current Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CartIcon.js      # Shopping cart icon with badge
│   ├── Footer.js        # Footer with links and social media
│   ├── Hero.js          # Hero banner section
│   ├── navbar.js        # Navigation bar with cart icon
│   ├── prodCard.js      # Individual product card
│   ├── productGrid.js   # Grid of product cards
│   ├── ProductReviews.js # Product reviews with star ratings
│   └── SearchFilter.js  # Search and filter component
│
├── pages/               # Page components (ready for routing)
│   ├── HomePage.js      # Main landing page with product grid
│   ├── ProductDetailsPage.js  # Individual product details
│   ├── CartPage.js      # Shopping cart page
│   ├── ContactPage.js   # Contact form and business info
│   ├── CheckoutPage.js  # Checkout form
│   └── index.js         # Exports all pages
│
├── App.js              # Main app with temporary navigation logic
├── index.js            # Entry point
└── index.css           # All styles (with dark theme support)
```

## Current Navigation System (Temporary)

Right now, the app uses a temporary state-based navigation system:

```js
const [currentPage, setCurrentPage] = useState('home');

const handleNavigation = (page, data) => {
  setCurrentPage(page);
  if (data) setSelectedProduct(data);
};

// Pages are rendered conditionally:
{currentPage === 'home' && <HomePage {...props} />}
{currentPage === 'cart' && <CartPage {...props} />}
// etc...
```

This works, but it's not real routing (no URL changes, no browser back/forward button support).

## How to Implement React Router

### Step 1: Install React Router

```bash
npm install react-router-dom
```

### Step 2: Update App.js

Replace the conditional rendering with React Router's routing system:

```js
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage, ProductDetailsPage, CartPage, ContactPage, CheckoutPage } from './pages';

function App() {
  const [products, setProducts] = useState([...]);
  const [cartItems, setCartItems] = useState([]);

  // Cart functions remain the same
  const addToCart = (product) => { ... };
  const removeFromCart = (productId) => { ... };
  const updateQuantity = (productId, quantity) => { ... };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                products={products}
                handleDelete={handleDelete}
                cartItemCount={cartItemCount}
                onAddToCart={addToCart}
              />
            } 
          />
          
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailsPage
                products={products}
                onAddToCart={addToCart}
                cartItemCount={cartItemCount}
              />
            } 
          />
          
          <Route 
            path="/cart" 
            element={
              <CartPage
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                cartItemCount={cartItemCount}
              />
            } 
          />
          
          <Route 
            path="/contact" 
            element={
              <ContactPage cartItemCount={cartItemCount} />
            } 
          />
          
          <Route 
            path="/checkout" 
            element={
              <CheckoutPage
                cartItems={cartItems}
                cartItemCount={cartItemCount}
              />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

### Step 3: Update Navbar Component

Replace onClick handlers with React Router's Link component:

```js
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';

const Navbar = (props) => {
  const { cartItemCount = 0 } = props;

  function ThemeToggle() { ... }

  return (
    <div className="header">
      <div className="logo">
        <img src='/assests/profile-icon-svg-download-png-1722755.webp' alt=""/>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/">Shop</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="nav-actions">
        <Link to="/cart">
          <CartIcon itemCount={cartItemCount} />
        </Link>
        <div className="profile" id="theme-toggle" onClick={ThemeToggle}>
          <svg>...</svg>
        </div>
      </div>
    </div>
  );
}
```

### Step 4: Update ProductDetailsPage

Use `useParams` hook to get the product ID from the URL:

```js
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailsPage = (props) => {
  const { id } = useParams();  // Get ID from URL
  const navigate = useNavigate();
  const { products, onAddToCart, cartItemCount } = props;

  // Find product by ID
  const product = products.find(p => p.id === parseInt(id));

  // Update navigation calls
  const handleBack = () => navigate('/');
  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
  };

  // ... rest of component
}
```

### Step 5: Update ProdCard Component

Use navigate to go to product details:

```js
import { useNavigate } from 'react-router-dom';

const ProdCard = (props) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img
        src={props.data.image}
        alt={props.data.title}
        onClick={() => navigate(`/product/${props.data.id}`)}
        style={{ cursor: 'pointer' }}
      />
      {/* ... rest of card ... */}
    </div>
  );
}
```

### Step 6: Update Page Components to Use Navigate

Replace all `onNavigate` prop calls with the `useNavigate` hook:

**CartPage.js:**
```js
import { useNavigate } from 'react-router-dom';

const CartPage = (props) => {
  const navigate = useNavigate();
  // Replace onNavigate('home') with navigate('/')
  // Replace onNavigate('checkout') with navigate('/checkout')
}
```

**CheckoutPage.js:**
```js
import { useNavigate } from 'react-router-dom';

const CheckoutPage = (props) => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order placed');
    navigate('/');  // Navigate to home after order
  };
}
```

## Key Concepts to Learn

### 1. **BrowserRouter**
Wraps your entire app to enable routing functionality.

### 2. **Routes & Route**
- `<Routes>` is a container for all your routes
- `<Route>` defines a single route with a path and component

### 3. **Link Component**
Replaces `<a>` tags for navigation without page refresh:
```js
<Link to="/cart">Go to Cart</Link>
```

### 4. **useNavigate Hook**
For programmatic navigation (like after form submission):
```js
const navigate = useNavigate();
navigate('/checkout');
```

### 5. **useParams Hook**
Access URL parameters:
```js
// URL: /product/123
const { id } = useParams();  // id = "123"
```

## Testing Your Implementation

After implementing routing:

1. **URL changes**: Check that the browser URL updates when navigating
2. **Back/Forward buttons**: Browser buttons should work
3. **Direct URLs**: Try accessing `http://localhost:3000/cart` directly
4. **Product details**: Click on a product and check the URL shows `/product/1`
5. **Cart persistence**: Navigate between pages and check cart count stays the same

## Additional Features to Explore

Once you have basic routing working:

1. **Protected Routes**: Redirect to login if user not authenticated
2. **404 Page**: Add a catch-all route for invalid URLs
3. **Nested Routes**: Routes within routes (like /shop/category/masks)
4. **Query Parameters**: Use `useSearchParams` for filtering
5. **Route Transitions**: Add animations between page changes

## Resources

- [React Router Documentation](https://reactrouter.com/en/main)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

## Current Cart State Management

The cart is managed in App.js with three functions:

```js
addToCart(product)       // Adds product or increments quantity
removeFromCart(productId) // Removes item from cart
updateQuantity(productId, quantity) // Updates item quantity
```

When implementing routing, keep these functions in App.js and pass them down as props to the page components that need them.

## Notes

- All pages are already built and ready for routing
- All navigation handlers accept `onNavigate` props (these will be replaced with `useNavigate`)
- Dark theme toggle works independently of routing
- Cart state persists across page navigation (as long as you don't refresh)
- For persistent cart across page refreshes, you'll need to add localStorage

Good luck with your React Router learning journey! 🚀
