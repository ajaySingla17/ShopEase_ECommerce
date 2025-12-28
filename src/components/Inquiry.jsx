import { useState } from 'react';
import Header from './Header';
import '../css/inquiry.css';
import '../css/index.css';

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    inquiries.push(formData);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    alert('Inquiry submitted successfully');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      <Header />
      <main className="inquiry-page-container">
        <section className="inquiry-hero">
          <div className="contact-card">
            <div className="contact-left">
              <h1>Contact Support</h1>
              <p className="lead">Have a question about an order, product, or return? Send us a message and our support team will reply within 24 hours.</p>

              <div className="contact-details">
                <div className="detail-row">
                  <i className="fa-solid fa-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:shopEase10@bridgelabz.com">shopEase10@bridgelabz.com</a>
                  </div>
                </div>

                <div className="detail-row">
                  <i className="fa-solid fa-phone"></i>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+1234567890">9814620044</a>
                  </div>
                </div>

                <div className="detail-row">
                  <i className="fa-solid fa-clock"></i>
                  <div>
                    <h4>Hours</h4>
                    <p>Mon–Fri: 9:00 — 18:00</p>
                  </div>
                </div>
              </div>

              <p className="small-muted">Prefer not to fill the form? You can also email us directly or call during business hours.</p>
            </div>

            <div className="contact-right">
              <form className="inquiry-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    pattern="[A-Za-z\s]+"
                    title="Name should only contain letters and spaces"
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Order, Product, Returns..."
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="banner-btn">Send message</button>
                  <button type="reset" className="btn-ghost" onClick={handleReset}>Reset</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Inquiry;