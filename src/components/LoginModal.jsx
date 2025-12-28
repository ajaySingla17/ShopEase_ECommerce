import { useState } from 'react';
import '../css/index.css'; // Assuming modal styles are in index.css

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        onClose();
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Register logic
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.email === formData.email)) {
        alert('User already exists');
        return;
      }
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      alert('Registration successful!');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div id="auth-modal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {isLogin ? (
          <div id="login-form">
            <h2>Login</h2>
            <form id="login" onSubmit={handleSubmit}>
              <input type="email" name="email" id="login-email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" id="login-password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Register</a></p>
          </div>
        ) : (
          <div id="register-form">
            <h2>Register</h2>
            <form id="register" onSubmit={handleSubmit}>
              <input type="text" name="name" id="register-name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" id="register-email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" id="register-password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;