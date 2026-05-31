import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import SearchFilter from '../components/SearchFilter';
import ProductGrid from '../components/productGrid';
import Footer from '../components/Footer';

const HomePage = (props) => {
  const { products, onNavigate, onSearch, onFilter, cartItemCount, onAddToCart } = props;

  return (
    <div>
      <Navbar onNavigate={onNavigate} cartItemCount={cartItemCount} />
      <Hero />
      <SearchFilter onSearch={onSearch} onFilter={onFilter} />
      <ProductGrid
        prods={products}
        onNavigate={onNavigate}
        onAddToCart={onAddToCart}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
