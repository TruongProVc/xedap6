import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaTimes,FaRegUser  } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  function handleLogout() {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
  }

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập
  const [username, setUsername] = useState(""); // Lưu tên người dùng

  const navigate = useNavigate(); // Initialize useNavigate

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem("username")); // Lưu tên người dùng từ localStorage (nếu có)
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = cartItems.reduce((total, item) => total + item.Quantity, 0);

  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Call tới API search trong controller
  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/search?q=${query}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (query.length > 2) {
      const timer = setTimeout(() => {
        fetchSearchResults(query);
      }, 300);
      setDebounceTimer(timer);
    } else {
      setSearchResults([]);
    }
  };

  const handleViewDetails = (productId) => {
    setSearchOpen(false);
    navigate(`/productdetails/${productId}`);
  };

  return (
    <>
      <header className="header-section d-none d-xl-block">
        <div className="header-wrapper">
          <div className="header-bottom header-bottom-color--black section-fluid sticky-header sticky-color--black">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div className="header-logo">
                    <div className="logo">
                      <Link to="/Home">
                        <img src="/images/logoo1.png" alt="Logo" />
                      </Link>
                    </div>
                  </div>
                  <Menu />
                  <ul className="header-action-link action-color--white action-hover-color--pink">
                    <li>
                      <a href="#search" onClick={handleSearchClick}>
                        <FaSearch color="white" />
                      </a>
                    </li>
                    <li>
                      <Link to={'/cart'} className="offcanvas-toggle">
                        <FaShoppingCart color="white" />
                        <span className="item-count">{totalQuantity}</span>
                      </Link>
                    </li>
                    <li>
                      {/* Start User Info Section */}
                      {isLoggedIn && (
                        <div className="user-info">
                          <div className="user-avatar">
                            <img src="/images/Sport.png" alt="User Avatar" />
                            <span className="username">{username}</span>
                          </div>
                          <div className="user-dropdown">
                            <ul>
                              <li>
                                <Link to={'/UserProfile'}>Profile</Link>
                              </li>
                              <li>
                                <a href="#" onClick={handleLogout}>Logout</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                      {!isLoggedIn && (
                        <Link to="/Login">
                          <FaRegUser color="white" />
                        </Link>
                      )}
                      {/* End User Info Section */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div id="search" className="search-modal open">
          <button type="button" className="close" onClick={handleCloseSearch}>
            <FaTimes />
          </button>
          <form>
            <input
              type="search"
              placeholder="Tìm kiếm sản phẩm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>

          {isLoading && <p className="loading-text">Đang tìm kiếm...</p>}

          <div className="product-list">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div key={product.id} className="product-item">
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => handleViewDetails(product.ProductId)}
                    src={`http://localhost:3000/uploads/${product.Avatar}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <p className="name">{product.ProductName}</p>
                  <p className="price">{product.Price.toLocaleString()} VND</p>
                  <button
                    className="view-product-link"
                    style={{ padding: "20px", color: "red" }}
                    onClick={() => handleViewDetails(product.ProductId)} // Call function on click
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))
            ) : (
              <p className="no-results">Không tìm thấy sản phẩm.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Menu = () => {
  return (
    <div className="main-menu menu-color--white menu-hover-color--pink">
      <nav>
        <ul>
          <li>
            <Link to="/Home">Trang chủ</Link>
          </li>
          <li className="has-dropdown">
            <Link to={"/AllItem"}>
              Sản phẩm <i className="fa fa-angle-down" />
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="/xedapdua">Xe đạp đua</Link>
              </li>
              <li>
                <Link to="#">Xe đạp địa hình</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to={"/AboutUs"}>About Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
