import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
const Cart = () => {
  
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Lấy giỏ hàng từ localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
    calculateTotal(cartData);
  }, []);

  // Tính toán tổng giá trị giỏ hàng
  const calculateTotal = (cartData) => {
    let total = 0;
    cartData.forEach(item => {
      total += item.Price * item.Quantity;
    });
    setTotalPrice(total);
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.ProductId === productId) {
        item.Quantity = newQuantity;
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeProduct = (productId) => {
    const updatedCart = cart.filter(item => item.ProductId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <>
      <div className="breadcrumb-section breadcrumb-bg-color--golden">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="breadcrumb-title">Cart</h3>
                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                  <nav aria-label="breadcrumb">
                    <ul>
                      <li><a href="index.html">Home</a></li>
                      <li><a href="shop-grid-sidebar-left.html">Cart</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Table */}
      <div className="cart-section">
        <div className="cart-table-wrapper" data-aos="fade-up" data-aos-delay={0}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="table_desc">
                  <div className="table_page table">
                    <table>
                      <thead>
                        <tr>
                          <th className="product_name">Tên sản phẩm</th>
                          <th className="product_price">Giá</th>
                          <th className="product_quantity">Số lượng</th>
                          <th className="product_total">Tổng</th>
                          <th className="product_remove">Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.length > 0 ? (
                          cart.map((item) => (
                            <tr key={item.ProductId}>
                              <td className="product_name">
                                <a>{item.ProductName}</a>
                              </td>
                              <td className="product_price">{Number(item.Price).toLocaleString()} VNĐ</td>
                              <td className="product_quantity">
                                
                                <input
                                  min={1}
                                  max={100}
                                  value={item.Quantity}
                                  type="number"
                                  onChange={(e) => updateQuantity(item.ProductId, Number(e.target.value))}
                                />
                              </td>
                              <td className="product_total">{(item.Price * item.Quantity).toLocaleString()} VNĐ</td>
                              <td className="product_remove">
                                <a href="#" onClick={() => removeProduct(item.ProductId)}>
                                <FaTrash style={{ color: 'black' }} />

                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">Giỏ hàng của bạn trống.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Totals */}
        <div className="coupon_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <div className="coupon_code right" data-aos="fade-up" data-aos-delay={400}>
                  <h3>Cart Totals</h3>
                  <div className="coupon_inner">
                    <div className="cart_subtotal">
                      <p>Giá</p>
                      <p className="cart_amount">{totalPrice.toLocaleString()} VNĐ</p>
                    </div>
                    <div className="cart_subtotal">
                      <p>Ship</p>
                      <p className="cart_amount">Free</p>
                    </div>
                    <div className="cart_subtotal">
                      <p>Tổng</p>
                      <p className="cart_amount">{totalPrice.toLocaleString()} VNĐ</p>
                    </div>
                    <div className="checkout_btn">
                      <a
                        href="#"
                        className={`btn btn-md ${cart.length > 0 ? "btn-pink" : "btn-gray"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (cart.length === 0) {
                            alert("Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm để tiếp tục thanh toán.");
                            return;
                          }
                          const token = localStorage.getItem("token");
                          if (token) {
                            window.location.href = "/checkout"; // Đường dẫn đến trang checkout
                          } else {
                            alert("Bạn cần đăng nhập để tiếp tục thanh toán.");
                            window.location.href = "/login"; // Đường dẫn đến trang đăng nhập
                          }
                        }}
                      >
                        Tiếp tục thanh toán
                      </a>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;