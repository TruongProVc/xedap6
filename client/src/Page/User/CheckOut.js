import React, { useState, useEffect } from 'react';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({
    Address: '',
    CustomerId: 0,
    Email: '',
    Firstname: '',
    Lastname: '',
    Mobile: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
  const [isLoading, setIsLoading] = useState(false);

  // Lấy giỏ hàng từ localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);  // Cập nhật state giỏ hàng với dữ liệu từ localStorage
    calculateTotal(cartData);  // Tính tổng tiền giỏ hàng
  }, []);

  // Lấy thông tin khách hàng từ token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để tiếp tục.');
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:3000/api/customer', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Không thể lấy thông tin khách hàng.');
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        alert('Không thể lấy thông tin khách hàng. Vui lòng thử lại.');
      });
  }, []);

  // Tính tổng giá trị giỏ hàng
  const calculateTotal = (cartData) => {
    const total = cartData.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
    setTotalPrice(total);
  };

  // Xử lý khi người dùng thay đổi thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Xử lý khi nhấn "Thanh toán"
// Xử lý khi nhấn "Thanh toán"
const handleCheckout = () => {
  // Kiểm tra giỏ hàng
  if (cart.length === 0) {
    alert('Giỏ hàng của bạn đang rỗng. Vui lòng thêm sản phẩm vào giỏ hàng.');
    return;
  }

  // Kiểm tra thông tin người dùng
  if (!userInfo.Address || !userInfo.Mobile || !userInfo.Email || !userInfo.Firstname || !userInfo.Lastname) {
    alert('Vui lòng điền đầy đủ thông tin cá nhân.');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Bạn cần đăng nhập để thanh toán.');
    window.location.href = '/login';
    return;
  }

  setIsLoading(true);

  // Tính tổng giá trị giỏ hàng (SubPrice)
  const subPrice = cart.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
  const discount = 0; // Mặc định Discount = 0

  fetch('http://localhost:3000/checkout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cart,
      paymentMethod,
      address: userInfo.Address,
      mobile: userInfo.Mobile,
      email: userInfo.Email,
      firstname: userInfo.Firstname,
      lastname: userInfo.Lastname,
      subPrice,   // Giá trị SubPrice tính từ giỏ hàng
      discount,   // Mặc định Discount = 0
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      if (data.message) {
        alert('Đặt hàng thành công! Mã đơn hàng: ' + data.orderId);

        // Xóa giỏ hàng sau khi đặt hàng thành công
        localStorage.removeItem('cart'); // Xóa giỏ hàng trong localStorage
        setCart([]); // Xóa giỏ hàng trong state

        window.location.href = '/';
      } else {
        alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
      }
    })
    .catch((error) => {
      setIsLoading(false);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
      console.error(error);
    });
};



  return (
      <>
      <div className="breadcrumb-section breadcrumb-bg-color--golden">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="breadcrumb-title">Check Out</h3>
                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                  <nav aria-label="breadcrumb">
                    <ul>
                      <li><a href="index.html">Home - Checkout</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="checkout-section">
          <div className="container">
            <div className="row">
              {/* User Quick Action Form */}
              <div className="col-12">
                <div
                  className="user-actions accordion"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <div
                    id="checkout_coupon"
                    className="collapse checkout_coupon"
                    data-parent="#checkout_coupon"
                  >
                  </div>
                </div>
              </div>
              {/* User Quick Action Form */}
            </div>
            {/* Start User Details Checkout Form */}
            <div className="checkout_form" data-aos="fade-up" data-aos-delay={400}>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <form action="#">
                    <h3>Thông tin khách hàng</h3>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="default-form-box">
                          <label>
                            First Name <span>*</span>
                          </label>
                          <input type="text" 
                          value={userInfo.Firstname}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="default-form-box">
                          <label>
                            Last Name <span>*</span>
                          </label>
                          <input type="text" 
                          value={userInfo.Lastname}
                          onChange={handleInputChange}/>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="default-form-box">
                          <label>
                            Địa chỉ <span>*</span>
                          </label>
                          <input placeholder="" type="text" 
                          value={userInfo.Address}
                          onChange={handleInputChange}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="default-form-box">
                          <label>
                            Phone<span>*</span>
                          </label>
                          <input type="text" 
                          value={userInfo.Mobile}
                          onChange={handleInputChange}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="default-form-box">
                          <label>
                            {" "}
                            Email Address <span>*</span>
                          </label>
                          <input type="text" 
                          value={userInfo.Email}/>
                        </div>
                      </div>
                    
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 col-md-6">
                  <form action="#">
                    <h3>Your order</h3>
                    <div className="order_table table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Tổng giá</th>
                          </tr>
                        </thead>
                        <tbody>
                      
                            {cart.map((item)=>(
                            <tr>
                              <td>{item.ProductName} <strong> x{item.Quantity}</strong></td>
                              <td>  {(item.Quantity * item.Price).toLocaleString()} VNĐ</td>
                            </tr>
                            ))}
                            
           
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Tổng tiền</th>
                            <td> {totalPrice.toLocaleString()} VNĐ</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>
                              <strong>Free</strong>
                            </td>
                          </tr>
                          <tr className="order_total">
                            <th>Tổng đơn hàng</th>
                            <td>
                              <strong>{totalPrice.toLocaleString()}VNĐ</strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="payment-method-dropdown">
  <label htmlFor="payment-method" className="payment-label">
    Phương thức thanh toán
  </label>
  <select
    id="payment-method"
    className="payment-select"
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
  >
    <option value="CashOnDelivery">Thanh toán khi nhận hàng</option>
    <option value="CreditCard">Thanh toán bằng thẻ</option>
  </select>
                    </div>

                    <div className="checkout_btn">
                    <a  
                      href="#"
                      className="btn btn-md btn-pink"
                      onClick={handleCheckout} disabled={isLoading}
                    >
                       thanh toán
                    </a>
                  </div>
                  </form>
                </div>
              </div>
            </div>{" "}
            {/* Start User Details Checkout Form */}
          </div>
        </div>
        {/* ...:::: End Checkout Section:::... */}
      </>
  );
};

export default Checkout;
