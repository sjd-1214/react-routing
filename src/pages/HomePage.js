import Hero from '../components/Hero';
import SearchFilter from '../components/SearchFilter';
import ProductGrid from '../components/productGrid';

const HomePage = (props) => {
  const { products, onAddToCart, onSearch, onFilter } = props;

  return (
    <div>
      <Hero />
      <SearchFilter onSearch={onSearch} onFilter={onFilter} />
      <ProductGrid
        prods={products}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default HomePage;
