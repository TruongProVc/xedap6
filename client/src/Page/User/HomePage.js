import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Content = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false); // Dừng trạng thái tải
      }
    };

    fetchProduct();
  }, []);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }



  return (
    <div>
      <div className="service-promo-section section-top-gap-100">
        <div className="service-wrapper">
          <div className="container">
            <div className="row">
              {/* Start Service Promo Single Item */}
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="service-promo-single-item" data-aos="fade-up" data-aos-delay={0}>
                  <div className="image">
                    <img src="/images/service-promo-5.png" alt="" />
                  </div>
                  <div className="content">
                    <h6 className="title">FREE SHIPPING</h6>
                   
                  </div>
                </div>
              </div>
              {/* End Service Promo Single Item */}
               {/* Start Service Promo Single Item */}
               <div className="col-lg-3 col-sm-6 col-12">
                <div className="service-promo-single-item" data-aos="fade-up" data-aos-delay={0}>
                  <div className="image">
                    <img src="/images/service-promo-5.png" alt="" />
                  </div>
                  <div className="content">
                    <h6 className="title">FREE SHIPPING</h6>
                   
                  </div>
                </div>
              </div>
              {/* End Service Promo Single Item */}
               {/* Start Service Promo Single Item */}
               <div className="col-lg-3 col-sm-6 col-12">
                <div className="service-promo-single-item" data-aos="fade-up" data-aos-delay={0}>
                  <div className="image">
                    <img src="/images/service-promo-5.png" alt="" />
                  </div>
                  <div className="content">
                    <h6 className="title">FREE SHIPPING</h6>
                   
                  </div>
                </div>
              </div>
              {/* End Service Promo Single Item */}
               {/* Start Service Promo Single Item */}
               <div className="col-lg-3 col-sm-6 col-12">
                <div className="service-promo-single-item" data-aos="fade-up" data-aos-delay={0}>
                  <div className="image">
                    <img src="/images/service-promo-5.png" alt="" />
                  </div>
                  <div className="content">
                    <h6 className="title">FREE SHIPPING</h6>
                  
                  </div>
                </div>
              </div>
              {/* End Service Promo Single Item */}
              {/* Other service items remain the same */}
            </div>
          </div>
        </div>
      </div>
  
      <div className="product-default-slider-section section-top-gap-100 section-fluid">
        {/* Start Section Content Text Area */}
        <div className="section-title-wrapper" data-aos="fade-up" data-aos-delay="0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-content-gap">
                  <div className="secton-content">
                    <h3 className="section-title">Sản phẩn bán chạy</h3>
                    <p><Link to='/AllItem'>Tất cả sản phẩm</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Section Content Text Area */}
  
        {/* Start Product Wrapper */}
        <div className="product-wrapper" data-aos="fade-up" data-aos-delay="200">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Product Items */}
                <div className="row">
                  {products.slice(0,4).map((product) => (
                    <div key={product.ProductId} className="col-12 col-md-3 mb-4">
                      <div className="product-default-single-item product-color--pink">
                        <div className="image-box">
                        <Link
                            to={`/productdetails/${product.ProductId}`}
                            className="image-link"
                          >
                            <img
                            src={`http://localhost:3000/uploads/${product.Avatar}`} // Đường dẫn ảnh
                            alt={product.ProductName}
                            />
                          </Link>
                          {product.tag && (
                            <div className="tag">
                              <span>{product.tag}</span>
                            </div>
                          )}
                          <div className="action-link">
                            <div className="action-link-left">
                            <Link to={`/productdetails/${product.ProductId}`}>
                                Add to Cart
                              </Link>
                            </div>
                            <div className="action-link-right">
                              <a href="#" data-bs-toggle="modal" data-bs-target="#modalQuickview">
                                <i className="icon-magnifier" />
                              </a>
                              <a href="wishlist.html">
                                <i className="icon-heart" />
                              </a>
                              <a href="compare.html">
                                <i className="icon-shuffle" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="content">
                          <div className="content-left">
                            <h6 className="title">
                            <Link to={`/productdetails/${product.ProductId}`}>
                            {product.ProductName.split(' ').slice(0, 4).join(' ')}{product.ProductName.split(' ').length > 6 ? '...' : ''}
                            </Link>
                            </h6>
                            <ul className="review-star">
                              {[...Array(5)].map((_, index) => (
                                <li className={index < product.stars ? 'fill' : 'empty'} key={index}>
                                  <i className="ion-android-star" />
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="content-right">
                            <span className="price">{Number(product.Price).toLocaleString()} VNĐ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Product Wrapper */}
      </div>
  
      {/* New Section for Race Bikes (Xe Đạp Đua) */}
      <div className="product-default-slider-section section-top-gap-100 section-fluid">
        {/* Start Section Content Text Area */}
        <div className="section-title-wrapper" data-aos="fade-up" data-aos-delay="0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-content-gap">
                  <div className="secton-content">
                    <h3 className="section-title">SẢN PHẨM MỚI</h3>
                    <p><Link to='/AllItem'>Tất cả sản phẩm</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Section Content Text Area */}
  
        {/* Start Product Wrapper */}
        <div className="product-wrapper" data-aos="fade-up" data-aos-delay="200">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Product Items */}
                <div className="row">
                  {products.slice(0,4).map((product) => (
                    <div key={product.ProductId} className="col-12 col-md-3 mb-4">
                      <div className="product-default-single-item product-color--pink">
                        <div className="image-box">
                        <Link
                            to={`/productdetails/${product.ProductId}`}
                            className="image-link"
                          >
                            <img
                            src={`http://localhost:3000/uploads/${product.Avatar}`} // Đường dẫn ảnh
                            alt={product.ProductName}
                            />
                          </Link>
                          {product.tag && (
                            <div className="tag">
                              <span>{product.tag}</span>
                            </div>
                          )}
                          <div className="action-link">
                            <div className="action-link-left">
                            <Link to={`/productdetails/${product.ProductId}`}>
                                Add to Cart
                              </Link>
                            </div>
                            <div className="action-link-right">
                              <a href="#" data-bs-toggle="modal" data-bs-target="#modalQuickview">
                                <i className="icon-magnifier" />
                              </a>
                              <a href="wishlist.html">
                                <i className="icon-heart" />
                              </a>
                              <a href="compare.html">
                                <i className="icon-shuffle" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="content">
                          <div className="content-left">
                            <h6 className="title">
                            <Link to={`/productdetails/${product.ProductId}`}>
                            {product.ProductName.split(' ').slice(0, 4).join(' ')}{product.ProductName.split(' ').length > 6 ? '...' : ''}
                            </Link>
                            </h6>
                            <ul className="review-star">
                              {[...Array(5)].map((_, index) => (
                                <li className={index < product.stars ? 'fill' : 'empty'} key={index}>
                                  <i className="ion-android-star" />
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="content-right">
                            <span className="price">{Number(product.Price).toLocaleString()} VNĐ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Product Wrapper */}
      </div>
    </div>
  );
  
};

export default Content;