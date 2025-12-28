import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import { products } from '../data/products';
import '../css/index.css';
import '../css/cart.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const foundOrder = orders.find(o => o.id == orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  if (!order) {
    return (
      <>
        <Header />
        <main className="cart-main">
          <h1>Order Not Found</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="cart-main">
        <h1 className="page-title">Order Details</h1>
        <div className="order-details">
          <div className="order-info">
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
          </div>
          <div className="order-items">
            <h2>Items Ordered</h2>
            {order.items.map((item, index) => {
              const product = products.find(p => p.id === item.id);
              return product ? (
                <div key={index} className="order-item-detail">
                  <img src={`/${product.image}`} alt={product.name} className="order-item-img" />
                  <div className="order-item-info">
                    <h3>{product.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{product.price} each</p>
                    <p>Total: ₹{product.price * item.quantity}</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderDetails;