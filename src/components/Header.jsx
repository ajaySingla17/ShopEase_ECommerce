import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import '../css/index.css';

const Header = ({ searchValue, setSearchValue }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name);
      // Load recent orders
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      const userOrders = orders.filter(order => order.userEmail === user.email);
      setRecentOrders(userOrders.slice(-5)); // Last 5 orders
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setRecentOrders([]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUserName('');
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header>
        <nav className="navbar-container">
          <nav className="left_navbar">
            <nav className="logo_area">
              <img src="/images/logo.png" alt="LOGO_IMAGE" />
              <span className="brand_name">ShopEase</span>
            </nav>
          </nav>

          {location.pathname === '/' && (
            <div className="center_navbar">
              <button className="icon-btn" title="Search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <div className="InputContainer">
                <input 
                  placeholder="Search.." 
                  id="input" 
                  className="input" 
                  name="text" 
                  type="text" 
                  value={searchValue || ''} 
                  onChange={(e) => setSearchValue && setSearchValue(e.target.value)} 
                />
              </div>
            </div>
          )}

          <nav className="right_navbar">
            <nav className="button_area">
              <Link to="/"> <i className="fa-solid fa-shirt"></i> Shop</Link>
              <Link to="/compare"> <i className="fa-solid fa-exchange-alt"></i> Compare</Link>
              <Link to="/cart"> <i className="fa-solid fa-shopping-cart"></i> Cart</Link>
              <Link to="/inquiry"> <i className="fa-solid fa-question-circle"></i> Inquiry</Link>
              {isLoggedIn ? (
                <div className="user-menu">
                  <span className="user-name" onClick={toggleDropdown}>
                    Welcome, {userName} <i className="fa-solid fa-chevron-down"></i>
                  </span>
                  {showDropdown && (
                    <div className="user-dropdown">
                      <div className="dropdown-item" onClick={handleLogout}>
                        <i className="fa-solid fa-sign-out-alt"></i> Logout
                      </div>
                      <div className="dropdown-section">
                        <h4>Recent Orders</h4>
                        {recentOrders.length > 0 ? (
                          recentOrders.map((order, index) => (
                            <div key={index} className="order-item" onClick={() => { navigate(`/orders/${order.id}`); setShowDropdown(false); }}>
                              <p>Order #{order.id} - ₹{order.total}</p>
                              <small>{new Date(order.date).toLocaleDateString()}</small>
                            </div>
                          ))
                        ) : (
                          <p>No recent orders</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a href="#" onClick={() => setShowLogin(true)}> <i className="fa-solid fa-user"></i> Login</a>
              )}
            </nav>
            <button className="hamburger-menu" onClick={toggleMobileMenu}>
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>
          {mobileMenuOpen && (
            <div className="mobile-menu">
              <Link to="/" onClick={closeMobileMenu}> <i className="fa-solid fa-shirt"></i> Shop</Link>
              <Link to="/compare" onClick={closeMobileMenu}> <i className="fa-solid fa-exchange-alt"></i> Compare</Link>
              <Link to="/cart" onClick={closeMobileMenu}> <i className="fa-solid fa-shopping-cart"></i> Cart</Link>
              <Link to="/inquiry" onClick={closeMobileMenu}> <i className="fa-solid fa-question-circle"></i> Inquiry</Link>
              {isLoggedIn ? (
                <div className="mobile-user-menu">
                  <span className="mobile-user-name">Welcome, {userName}</span>
                  <div className="mobile-dropdown-item" onClick={handleLogout}>
                    <i className="fa-solid fa-sign-out-alt"></i> Logout
                  </div>
                  <div className="mobile-dropdown-section">
                    <h4>Recent Orders</h4>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order, index) => (
                        <div key={index} className="mobile-order-item" onClick={() => { navigate(`/orders/${order.id}`); closeMobileMenu(); }}>
                          <p>Order #{order.id} - ₹{order.total}</p>
                          <small>{new Date(order.date).toLocaleDateString()}</small>
                        </div>
                      ))
                    ) : (
                      <p>No recent orders</p>
                    )}
                  </div>
                </div>
              ) : (
                <a href="#" onClick={() => { setShowLogin(true); closeMobileMenu(); }}> <i className="fa-solid fa-user"></i> Login</a>
              )}
            </div>
          )}
        </nav>
      </header>
      <LoginModal isOpen={showLogin} onClose={() => { setShowLogin(false); const user = JSON.parse(localStorage.getItem('currentUser')); setIsLoggedIn(!!user); setUserName(user ? user.name : ''); }} />
    </>
  );
};

export default Header;