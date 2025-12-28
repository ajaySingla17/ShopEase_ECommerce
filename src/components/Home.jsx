import { useState, useEffect } from 'react';
import Header from './Header';
import { products } from '../data/products';
import '../css/index.css';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cartAlert, setCartAlert] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [compareItems, setCompareItems] = useState([]);

  useEffect(() => {
    const filtered = products.filter(product => {
      const name = product.name.toLowerCase();
      const category = product.category.toLowerCase();
      const query = searchValue.toLowerCase().trim();
      return category.includes(query) || name.includes(query);
    });
    setFilteredProducts(filtered);
  }, [searchValue]);

  useEffect(() => {
    const compare = JSON.parse(localStorage.getItem('compare')) || [];
    setCompareItems(compare);
  }, []);

  const addToCart = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartAlert(true);
    setTimeout(() => setCartAlert(false), 2000);
  };

  const handleCompareChange = (id, checked) => {
    let compare = JSON.parse(localStorage.getItem('compare')) || [];
    const product = products.find(p => p.id === id);
    
    if (!product) return;
    
    if (checked) {
      // Check if trying to add product from different category
      if (compare.length > 0) {
        const firstProductCategory = compare[0].category;
        if (product.category !== firstProductCategory) {
          alert(`You can only compare products from the same category.`);
          return;
        }
      }
      
      // Add product if not already in compare
      if (!compare.find(item => item.id === id)) {
        compare.push(product);
        localStorage.setItem('compare', JSON.stringify(compare));
        setCompareItems([...compare]);
      }
    } else {
      // Remove product from compare
      compare = compare.filter(item => item.id !== id);
      localStorage.setItem('compare', JSON.stringify(compare));
      setCompareItems([...compare]);
    }
  };

  const categories = ['tshirts', 'shoes', 'jackets', 'denim'];

  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="banner-space">
        <div className="banner-slideshow" aria-hidden="false">
          <img className="banner-slide" src="/images/banner-1.webp" alt="ShopEase Banner 1" />
          <img className="banner-slide" src="/images/banner-2.webp" alt="ShopEase Banner 2" />
          <img className="banner-slide" src="/images/banner-3.webp" alt="ShopEase Banner 3" />
        </div>
        <div className="banner-content" id="banner">
          <div className="banner-text">
            <h2>Welcome to ShopEase</h2>
            <p>Discover the latest in fashion: T-Shirts, Shoes, Jackets, and Denim!</p>
            <button className="banner-btn" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
              Shop Now
            </button>
          </div>
          <div className="banner-marquee" aria-hidden="false">
            <div className="marquee" aria-hidden="true">
              <span>Free shipping on orders over ₹2000 — New arrivals: T-Shirts & Jackets — Up to 30% off select items</span>
              <span>Free shipping on orders over ₹2000 — New arrivals: T-Shirts & Jackets — Up to 30% off select items</span>
              <span>Free shipping on orders over ₹2000— New arrivals: T-Shirts & Jackets — Up to 30% off select items</span>
            </div>
          </div>
        </div>
      </div>
      <main>
        <section id="products" className="product-listing">
          <h2>Products</h2>
          {categories.map(category => {
            const categoryProducts = filteredProducts.filter(p => p.category === category);
            if (categoryProducts.length === 0) return null;
            return (
              <section key={category} className="category">
                <h3 className="category-heading">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <ul className="products-grid">
                  {categoryProducts.map(product => (
                    <li key={product.id} className="product-card" data-category={category}>
                      <a href={`#product-${product.id}`} className="product-link">
                        <figure>
                          <img src={`/${product.image}`} alt={product.name} />
                          <figcaption>
                            <h4>{product.name}</h4>
                            <p>₹{product.price}</p>
                          </figcaption>
                        </figure>
                      </a>
                      <div className="card-actions">
                        <button className="add-cart" onClick={() => addToCart(product.id)}>Add to Cart</button>
                        <label>
                          <input 
                            type="checkbox" 
                            className="compare-checkbox" 
                            data-product={product.id} 
                            checked={compareItems.some(item => item.id === product.id)}
                            onChange={(e) => handleCompareChange(product.id, e.target.checked)} 
                          /> Compare
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </section>
      </main>
      {/* Modals would go here */}
      {cartAlert && <div id="cart-alert" className="alert">Item added to cart!</div>}
    </>
  );
};

export default Home;