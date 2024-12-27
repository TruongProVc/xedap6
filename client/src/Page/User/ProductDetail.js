import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [productdetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specifications, setSpecifications] = useState([]);
  const [comments, setComments] = useState([]); // Danh sách bình luận
  const [newComment, setNewComment] = useState(''); // Lưu nội dung bình luận mới
  const [Images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState(`http://localhost:3000/uploads/${productdetails?.Avatar}`);

  const [userInfo, setUserInfo] = useState({
    Address: '',
    CustomerId: 0,
    Email: '',
    Firstname: '',
    Lastname: '',
    Mobile: ''
  });

  
  // Hàm g  ọi API chi tiết sản phẩm
const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/productdetails/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product details');
      const data = await response.json();
      setProductDetails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
//hàm gọi api ảnh theo product
const fetchImages = async () => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}/images`);
    if (!response.ok) throw new Error('Failed to fetch images');
    const data = await response.json();
    setImages(data.data); // Gán danh sách ảnh từ API vào state
  } catch (error) {
    setError(error.message);
  }
};
  
  // Hàm gọi API thông số kỹ thuật
  const fetchSpecifications = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}/specifications`);
      if (!response.ok) throw new Error('Failed to fetch specifications');
      const data = await response.json();
      setSpecifications(data.data); // Lấy mảng specifications từ API
    } catch (error) {
      setError(error.message);
    }
  };
  

  // Hàm thêm sản phẩm vào giỏ hàng
const handleAddToCart = (product) => {  
    try {
      let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage, nếu không có thì khởi tạo giỏ hàng mới
  
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProductIndex = cart.findIndex(item => item.ProductId === product.ProductId);
  
      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có, tăng số lượng
        cart[existingProductIndex].Quantity += 1;
      } else {
        // Nếu sản phẩm chưa có, thêm mới
        cart.push({
          ProductId: product.ProductId,
          ProductName: product.ProductName,
          Price: product.Price,
          Quantity: 1, // Mặc định là 1
        });
      }
  
      // Lưu giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Thêm sản phẩm vào giỏ hàng thất bại');
    }
  };
//Hiển thị bình luận
  const fetchComments = async () => {
  try {
    const response = await fetch(`http://localhost:3000/comments/${id}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    const data = await response.json();
    console.log(data)

    // Thêm thông tin tên khách hàng vào từng bình luận
    const commentsWithNames = data.map((comment) => {
      return {
        ...comment,
        CustomerName: comment.CustomerId === userInfo.CustomerId ? userInfo.Firstname + ' ' + userInfo.Lastname : 'Khách hàng ẩn danh', // So khớp ID để lấy tên
      };
    });

    setComments(commentsWithNames);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
const handleAddComment = async () => {
  if (!newComment.trim()) {
    alert('Vui lòng nhập nội dung bình luận.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thêm bình luận.');
      window.location.href = '/login';
      return;
    }

    const response = await fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ProductId: id,
        Content: newComment,
      }),
    });

    if (!response.ok) throw new Error('Thêm bình luận thất bại');

    const createdComment = await response.json();

    // Cập nhật danh sách bình luận mới với thông tin username đã được trả về từ backend
    setComments((prevComments) => {
      // Tạo một bản sao của danh sách bình luận cũ và thêm bình luận mới
      const updatedComments = [...prevComments, createdComment];

      return updatedComments;
    });

    setNewComment(''); // Reset nội dung bình luận sau khi thêm
    alert('Bình luận của bạn đã được thêm!');
  } catch (error) {
    console.error('Error adding comment:', error);
    alert('Đã xảy ra lỗi khi thêm bình luận');
  }
};
  // Hàm để thay đổi ảnh lớn khi bấm vào ảnh nhỏ
  const handleSmallImageClick = (imageUrl) => {
    setLargeImage(`http://localhost:3000/uploads/${imageUrl}`);
  };

  // Cập nhật ảnh lớn khi `productdetails?.Avatar` thay đổi
  useEffect(() => {
    setLargeImage(`http://localhost:3000/uploads/${productdetails?.Avatar}`);
  }, [productdetails?.Avatar]);
//call để lấy giải mã token
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
  
  // useEffect để gọi API
  useEffect(() => {
    fetchProductDetails();
    fetchSpecifications();
    fetchComments();
    fetchImages();
  }, [id]);

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="breadcrumb-section breadcrumb-bg-color--golden">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="breadcrumb-title">Chi tiết sản phẩm</h3>
                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                  <nav aria-label="breadcrumb">
                    <ul>
                      <li>
                        <a href="index.html">Trang chủ - Chi tiết sản phẩm</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb Section */}

      {/* Chi tiết sản phẩm  */}
      <div className="product-details-section ">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="product-details-gallery-area" data-aos="fade-up" data-aos-delay={0}>
                {/* Start Large Image */}
                <div className="product-large-image product-large-image-horizontal swiper-container">
                  <div className="swiper-wrapper">
                    <div className="product-image-large-image">
                      <img
                        src={largeImage}
                        alt={productdetails?.ProductName}
                      />
                    </div>
                  </div>
                </div>
                {/* End Large Image */}
                {/* Start Small Image Grid */}
                <div className="product-small-image-grid">
                  <div className="row">
                    {Images.map((image, index) => (
                      <div className="col-3" key={index}>
                        <div className="small-image-wrapper">
                          <img
                            src={`http://localhost:3000/uploads/${image.ImageUrl}`}
                            alt={`Product small thumbnail ${index + 1}`}
                            className="img-fluid"
                            onClick={() => handleSmallImageClick(image.ImageUrl)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* End Small Image Grid */}
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="product-details-content-area" data-aos="fade-up" data-aos-delay={200}>
                {/* Start Product Details Text Area*/}
                <div className="product-details-text">
                  <h4 className="title">{productdetails?.ProductName}</h4>
                  <div className="d-flex align-items-center">
                    <ul className="review-star">
                      <li className="fill">
                        <i className="ion-android-star" />
                      </li>
                      <li className="fill">
                        <i className="ion-android-star" />
                      </li>
                      <li className="fill">
                        <i className="ion-android-star" />
                      </li>
                      <li className="fill">
                        <i className="ion-android-star" />
                      </li>
                      <li className="empty">
                        <i className="ion-android-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="price">
                    {Number(productdetails?.Price).toLocaleString()} VNĐ
                  </div>
                  <p>Mô tả: {productdetails?.Description}</p>
                </div>
                {/* End Product Details Text Area*/}
                {/* Start Product Variable Area */}
                <div className="product-details-variable">
                  <div className="variable-single-item">
                    <div className="product-stock">
                      <span className="product-stock-in">
                        <i className="ion-checkmark-circled" />
                      </span> CÒN HÀNG
                    </div>
                  </div>
                  {/* Product Variable Single Item */}
                  <div className="d-flex align-items-center">
                    <div className="product-add-to-cart-btn">
                    <a href="#" onClick={() => handleAddToCart(productdetails)}>
                      Add To Cart
                    </a>                    
                </div>
                  </div>
                </div>  
                {/* End Product Variable Area */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chi tiết sản phẩm  */}

      {/* Thông số kĩ thuật */}
      <div className="product-details-content-tab-section section-top-gap-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="product-details-content-tab-wrapper" data-aos="fade-up" data-aos-delay={0}>
                {/* Start Product Details Tab Button */}
                <ul className="nav tablist product-details-content-tab-btn d-flex justify-content-center">
                  <li>
                    <a className="nav-link active" data-bs-toggle="tab" href="#specifications">
                      Thông số kỹ thuật
                    </a>
                  </li>
                </ul>
                {/* End Product Details Tab Button */}
                {/* Start Product Details Tab Content */}
                <div className="product-details-content-tab">
                  <div className="tab-content">
                    <div className="tab-pane active show" id="specifications">
                      <div className="single-tab-content-item">
                        {/* Start Technical Specifications Table */}
                        <div className="specifications-table-wrapper">
                          <table className="table table-bordered">
                            <tbody>
                              {specifications.length > 0 ? (
                                specifications.map((spec, index) => (
                                  <tr key={index}>
                                    <th>{spec.SpecificationName}</th>
                                    <td>{spec.SpecificationContent}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="2">Không có thông số kỹ thuật nào.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* End Technical Specifications Table */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Product Details Tab Content */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Thông số kĩ thuật end*/}

      {/* Bình luận */}
<div className="product-details-content-tab-section section-top-gap-100">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div
          className="product-details-content-tab-wrapper"
          data-aos="fade-up"
          data-aos-delay={0}
        >
          {/* Start Product Details Tab Button */}
          <ul className="nav tablist product-details-content-tab-btn d-flex justify-content-center">
            <li>
              <a className="nav-link active" data-bs-toggle="tab" href="#review">
                Reviews ({comments.length})
              </a>
            </li>
          </ul>
          {/* End Product Details Tab Button */}
          
          {/* Start Product Details Tab Content */}
          <div className="product-details-content-tab">
            <div className="tab-content">
              {/* Start Product Details Tab Content Singel */}
              <div className="tab-pane active show" id="review">
                <div className="single-tab-content-item">
                  {/* Danh sách bình luận */}
                  <ul className="comment">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <li key={comment.CommentId} className="comment-list">
                          <div className="comment-wrapper">
                            <div className="comment-content">
                              <div className="comment-content-top">
                                <div className="comment-content-left">
                                  <h6 className="comment-name">
                                  {comment.Account?.Email || "Bạn vừa đăng một bình luận :"}
                                  </h6>
                                  <ul className="review-star">
                                    <li className="fill">
                                      <i className="ion-android-star" />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="para-content">
                                <p>{comment.Content}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>Không có bình luận nào.</li>
                    )}
                  </ul>

                  {/* Form Gửi Bình Luận */}
                  <div className="review-form">
                    <div className="review-form-text-top">
                      <h5>Thêm bình luận</h5>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row">
                        <div className="col-12">
                          <div className="default-form-box">
                            <label htmlFor="comment-review-text">
                              Nội dung bình luận<span>*</span>
                            </label>
                            <textarea
                              id="comment-review-text"
                              placeholder="Viết bình luận"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="checkout_btn">
                          <button
                            className="btn btn-md btn-pink"
                            type="button"
                            onClick={handleAddComment}
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* End Product Details Tab Content Singel */}
            </div>
          </div>
          {/* End Product Details Tab Content */}
        </div>
      </div>
    </div>
  </div>
</div>
{/* Bình luận */}

    </>
  );
};

export default ProductDetails;