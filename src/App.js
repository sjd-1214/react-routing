import { useState } from 'react'
import { HomePage, ProductDetailsPage, CartPage, ContactPage, CheckoutPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar';
import Footer from './components/Footer';

function App() {

  const products = [
    { id: 0, title: 'Squid Games - Lion Mask', image: '/assests/game-mask.webp', price: 5500, discount: 15, category: 'Character' },
    { id: 1, title: 'Funny Green Fish Mask', image: '/assests/green-fish.webp', price: 3500, discount: 10, category: 'Animal' },
    { id: 2, title: 'Victory - Head Mask', image: '/assests/victory-mask.webp', price: 6500, discount: 25, category: 'Sports' },
    { id: 3, title: 'Classic Phantom Mask', image: 'https://placehold.co/400x400/8B4513/FFF?text=Phantom+Mask', price: 4200, discount: 12, category: 'Classic' },
    { id: 4, title: 'Scary Clown Mask', image: 'https://placehold.co/400x400/FF0000/FFF?text=Clown+Mask', price: 4800, discount: 18, category: 'Horror' },
    { id: 5, title: 'Venetian Gold Mask', image: 'https://placehold.co/400x400/FFD700/000?text=Venetian+Mask', price: 7500, discount: 20, category: 'Luxury' },
    { id: 6, title: 'Ninja Stealth Mask', image: 'https://placehold.co/400x400/000000/FFF?text=Ninja+Mask', price: 3200, discount: 8, category: 'Character' },
    { id: 7, title: 'Zombie Apocalypse Mask', image: 'https://placehold.co/400x400/228B22/FFF?text=Zombie+Mask', price: 5200, discount: 15, category: 'Horror' },
    { id: 8, title: 'Dragon Warrior Mask', image: 'https://placehold.co/400x400/FF4500/FFF?text=Dragon+Mask', price: 6800, discount: 22, category: 'Fantasy' },
    { id: 9, title: 'Robot Cyborg Mask', image: 'https://placehold.co/400x400/C0C0C0/000?text=Robot+Mask', price: 5900, discount: 16, category: 'Sci-Fi' },
    { id: 10, title: 'Tiger Spirit Mask', image: 'https://placehold.co/400x400/FFA500/000?text=Tiger+Mask', price: 4500, discount: 14, category: 'Animal' },
    { id: 11, title: 'Samurai Honor Mask', image: 'https://placehold.co/400x400/8B0000/FFF?text=Samurai+Mask', price: 7200, discount: 20, category: 'Traditional' },
    { id: 12, title: 'Alien Invader Mask', image: 'https://placehold.co/400x400/00FF00/000?text=Alien+Mask', price: 5500, discount: 17, category: 'Sci-Fi' },
    { id: 13, title: 'Sugar Skull Mask', image: 'https://placehold.co/400x400/FF1493/FFF?text=Sugar+Skull', price: 4000, discount: 10, category: 'Traditional' },
    { id: 14, title: 'Hockey Legend Mask', image: 'https://placehold.co/400x400/FFFFFF/000?text=Hockey+Mask', price: 3800, discount: 12, category: 'Sports' },
    { id: 15, title: 'Steampunk Gear Mask', image: 'https://placehold.co/400x400/CD7F32/000?text=Steampunk+Mask', price: 6200, discount: 18, category: 'Fantasy' }
  ];


  // Cart state management
  const [cartItems, setCartItems] = useState([]);

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity || 1 }]);
    }

    alert(`${product.title} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  // Search and filter functions
  const handleSearch = (searchTerm) => {
    console.log('Search:', searchTerm);
    // TODO: Implement search logic when adding more features
  };

  const handleFilter = (filterValue) => {
    console.log('Filter:', filterValue);
    // TODO: Implement filter logic when adding more features
  };

  if (localStorage.getItem("site-theme") === "dark") {
    document.body.classList.add("dark-theme");
  }

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar cartItemCount={cartItemCount} />
        <Routes>
          <Route path="/" element={
            <HomePage
              products={products}
              onAddToCart={addToCart}
              onSearch={handleSearch}
              onFilter={handleFilter}
            />
          } />
          <Route path="/productDetails/:id" element={
            <ProductDetailsPage
              products={products}
              onAddToCart={addToCart}
            />
          } />
          <Route path="/cart" element={
            <CartPage
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          } />
          <Route path="/contact" element={
            <ContactPage />
          } />
          <Route path="/checkout" element={
            <CheckoutPage
              cartItems={cartItems}
            />
          } />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
