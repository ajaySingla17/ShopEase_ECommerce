import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { products } from '../data/products';
import '../css/cart.css';
import '../css/index.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    const user = localStorage.getItem('currentUser');
    setIsLoggedIn(!!user);
  }, []);

  const decreaseItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
      } else {
        cart.splice(itemIndex, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartItems([...cart]);
    }
  };

  const increaseItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartItems([...cart]);
    }
  };

  const removeItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems([...newCart]);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    const paymentMethod = e.target.payment.value;
    // Capture ordered items before clearing
    setOrderedItems([...cartItems]);
    // Save order
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const order = {
      id: Date.now(),
      userEmail: user.email,
      items: [...cartItems],
      total: total,
      paymentMethod: paymentMethod,
      date: new Date().toISOString()
    };
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    // Simulate payment processing
    localStorage.removeItem('cart');
    setCartItems([]);
    setOrderPlaced(true);
  };

  let subtotal = 0;
  let itemCount = 0;
  cartItems.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      subtotal += product.price * item.quantity;
      itemCount += item.quantity;
    }
  });

  const shipping = subtotal === 0 || subtotal > 1500 ? 0 : 100;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <>
      <Header />
      <main className="cart-main">
        <h1 className="page-title">Your Shopping Cart</h1>

        <section className="cart-container" id="cart-view">
          <div className="cart-items-list">
            <div id="cart-items">
              {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                  <div className="empty-cart-content">
                    <div className="empty-cart-icon">
                      <i className="fa-solid fa-shopping-cart"></i>
                    </div>
                    <h2 className="empty-cart-title">Your Cart is Empty</h2>
                    <p className="empty-cart-message">
                      Looks like you haven't added any items to your cart yet. 
                      Start shopping to fill it up with amazing products!
                    </p>
                    <div className="empty-cart-actions">
                      <Link to="/" className="shop-now-btn">
                        <i className="fa-solid fa-arrow-left"></i>
                        Continue Shopping
                      </Link>
                      <div className="empty-cart-tips">
                        <h4>Popular Categories</h4>
                        <div className="category-links">
                          <Link to="/?search=tshirts" className="category-link">T-Shirts</Link>
                          <Link to="/?search=shoes" className="category-link">Shoes</Link>
                          <Link to="/?search=jackets" className="category-link">Jackets</Link>
                          <Link to="/?search=denim" className="category-link">Denim</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                cartItems.map((item, index) => {
                  const product = products.find(p => p.id === item.id);
                  return product ? (
                    <article key={index} className="cart-item">
                      <img src={product.image} alt={product.name} />
                      <div className="item-details">
                        <h4>{product.name}</h4>
                        <p className="item-meta">Category: {product.category} | Item ID: #{product.id}</p>
                      </div>
                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button className="qty-btn decrease-btn" onClick={() => decreaseItem(item.id)} title="Decrease Quantity">-</button>
                          <label>Qty: <span>{item.quantity}</span></label>
                          <button className="qty-btn increase-btn" onClick={() => increaseItem(item.id)} title="Increase Quantity">+</button>
                        </div>
                        <p className="item-price">₹{product.price * item.quantity}</p>
                        <button className="remove-btn" onClick={() => removeItem(item.id)} title="Remove All">
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </article>
                  ) : null;
                })
              )}
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-line">
                <span>Subtotal ({itemCount} Items)</span>
                <span className="value">₹{subtotal}</span>
              </div>
              <div className="summary-line">
                <span>Shipping Estimate</span>
                <span className="value">₹{shipping}</span>
              </div>
              <div className="summary-line discount">
                <span>Discount</span>
                <span className="value text-green">-₹{discount}</span>
              </div>
              <div className="summary-line total">
                <span>Order Total</span>
                <span className="value total-value">₹{total}</span>
              </div>
              <a href="#checkout-section" className="checkout-btn">Proceed to Checkout</a>
            </div>
          )}
        </section>

        <div className="section-divider"></div>

        {cartItems.length > 0 && (
          <section className="checkout-section" id="checkout-section">
            <h2 className="section-title">2. Select Payment Method</h2>
            {isLoggedIn ? (
              <form className="payment-form" onSubmit={handlePayment}>
                <fieldset className="payment-options">
                  <legend className="visually-hidden">Choose a payment method</legend>
                  <label className="payment-card">
                    <input type="radio" name="payment" value="credit" defaultChecked />
                    Credit Card
                  </label>
                  <label className="payment-card">
                    <input type="radio" name="payment" value="debit" />
                    Debit Card
                  </label>
                  <label className="payment-card">
                    <input type="radio" name="payment" value="upi" />
                    UPI
                  </label>
                  <label className="payment-card">
                    <input type="radio" name="payment" value="netbanking" />
                    Net Banking
                  </label>
                  <label className="payment-card">
                    <input type="radio" name="payment" value="cod" />
                    Cash on Delivery
                  </label>
                </fieldset>
                <button type="submit" className="pay-btn">Pay ₹{total} Now</button>
              </form>
            ) : (
              <div className="login-required">
                <p>Please <a href="#" onClick={() => setShowLoginPrompt(true)}>login</a> to proceed with payment.</p>
              </div>
            )}
          </section>
        )}

        {orderPlaced && (
          <div className="order-modal" style={{ display: 'block' }}>
            <div className="order-modal-content">
              <span className="close" onClick={() => setOrderPlaced(false)}>&times;</span>
              <h2>Order Placed Successfully!</h2>
              <p>Your order has been placed. You will receive a confirmation email shortly.</p>
              <div className="order-summary">
                <h3>Order Details</h3>
                {orderedItems.map((item, index) => {
                  const product = products.find(p => p.id === item.id);
                  return product ? (
                    <div key={index} className="order-item">
                      <img src={product.image} alt={product.name} className="order-item-img" />
                      <div className="order-item-details">
                        <h4>{product.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹{product.price * item.quantity}</p>
                      </div>
                    </div>
                  ) : null;
                })}
                <div className="order-total">
                  <strong>Total: ₹{orderedItems.reduce((sum, item) => {
                    const product = products.find(p => p.id === item.id);
                    return sum + (product ? product.price * item.quantity : 0);
                  }, 0) + (orderedItems.reduce((sum, item) => {
                    const product = products.find(p => p.id === item.id);
                    return sum + (product ? product.price * item.quantity : 0);
                  }, 0) > 1500 ? 0 : 100)}</strong>
                </div>
              </div>
              <button className="continue-shopping-btn" onClick={() => setOrderPlaced(false)}>Continue Shopping</button>
            </div>
          </div>
        )}

        {showLoginPrompt && (
          <div className="order-modal" style={{ display: 'block' }}>
            <div className="order-modal-content">
              <span className="close" onClick={() => setShowLoginPrompt(false)}>&times;</span>
              <h2>Login Required</h2>
              <p>Please login first to place your order.</p>
              <button className="continue-shopping-btn" onClick={() => setShowLoginPrompt(false)}>Close</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Cart;