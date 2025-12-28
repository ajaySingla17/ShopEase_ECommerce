import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { products } from '../data/products';
import '../css/compare.css';
import '../css/index.css';

const Compare = () => {
  const [compareItems, setCompareItems] = useState([]);

  useEffect(() => {
    const compare = JSON.parse(localStorage.getItem('compare')) || [];
    setCompareItems(compare);
  }, []);

  const removeFromCompare = (id) => {
    let compare = JSON.parse(localStorage.getItem('compare')) || [];
    compare = compare.filter(item => item.id !== id);
    localStorage.setItem('compare', JSON.stringify(compare));
    setCompareItems([...compare]);
  };

  const addToCart = (id) => {
    const product = compareItems.find(p => p.id === id);
    if (!product) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <>
      <Header />
      <main className="compare-main">
        <h1 className="page-title">Product Comparison Center</h1>
        <p className="subtitle">Compare key specifications and features side-by-side to make the best choice.</p>

        <section id="comparison-section">
          {compareItems.length === 0 ? (
            <div className="no-compare-card">
              <i className="fa-solid fa-exchange-alt"></i>
              <h2>No Items to Compare</h2>
              <p>Add products from the shop to compare them side by side.</p>
              <Link to="/" className="shop-link">Go to Shop</Link>
            </div>
          ) : (
            <div id="compare-table-container">
              <table className="comparison-table">
                <thead>
                  <tr className="product-header">
                    <th>Feature</th>
                    {compareItems.map(item => (
                      <th key={item.id}>
                        <div className="product-info-cell">
                          <img src={`/${item.image}`} alt={item.name} />
                          <h4>{item.name}</h4>
                          <p className="price">₹{item.price}</p>
                          <button className="remove-btn" onClick={() => removeFromCompare(item.id)}>Remove</button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="static-row">
                    <td>Category</td>
                    {compareItems.map(item => (
                      <td key={item.id}>{item.category}</td>
                    ))}
                  </tr>
                  <tr className="static-row">
                    <td>Price</td>
                    {compareItems.map(item => (
                      <td key={item.id}>₹{item.price}</td>
                    ))}
                  </tr>
                  <tr className="feature-row">
                    <td>Actions</td>
                    {compareItems.map(item => (
                      <td key={item.id}>
                        <button className="add-to-cart-btn" onClick={() => addToCart(item.id)}>Add to Cart</button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Compare;