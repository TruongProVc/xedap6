import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const { orderId } = useParams();  // Lấy orderId từ URL
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/order/${orderId}`);
                if (!response.ok) throw new Error('Failed to fetch order details');
                const data = await response.json();
                console.log(data);  // Kiểm tra dữ liệu trả về
                setOrder(data);  // Đảm bảo data là một đối tượng hợp lệ
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    if (isLoading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    if (!order || order.length === 0) return <div>Đơn hàng không tồn tại.</div>;

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h3>Chi tiết đơn hàng #{order[0].Order.OrderId}</h3>
                </div>
                <div className="card-body">
                    {/* Thông tin đơn hàng */}
                    <section className="order-info mb-4">
                        <h5>Thông tin đơn hàng</h5>
                        <div className="row">
                            <div className="col-sm-6">
                                <p><strong>Ngày tạo:</strong> {new Date(order[0].Order.CreateAt).toLocaleString()}</p>
                                <p><strong>Phương thức thanh toán:</strong> {order[0].Order.PaymentMethod}</p>
                                <p><strong>Tổng giá trị:</strong> {order[0].Order.TotalPrice.toLocaleString()} VND</p>
                                <p><strong>Trạng thái đơn hàng:</strong> {order[0].Order.OrderStatus === 0 ? 'Chờ xử lý' : 'Đã hoàn thành'}</p>
                            </div>
                        </div>
                    </section>

                    {/* Thông tin sản phẩm */}
                    <section className="order-products mb-4">
                        <h5>Danh sách sản phẩm đã mua</h5>
                        <div className="row">
                            {order.map((orderDetail, index) => (
                                <div key={index} className="col-sm-6 mb-12">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h6 className="card-title">{orderDetail.Product.ProductName.split(' ').slice(0, 4).join(' ')}{orderDetail.Product.ProductName.split(' ').length > 6 ? '...' : ''}</h6>
                                            

                                            <p className="product-price"><strong>Giá:</strong> {orderDetail.Product.Price.toLocaleString()} VND</p>
                                            <img 
                                                src={`http://localhost:3000/uploads/${orderDetail.Product.Avatar}`} 
                                                alt={orderDetail.Product.ProductName} 
                                                width={100} 
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Thông tin khách hàng (nếu có) */}
                    {order[0].Customer && (
                        <section className="customer-info">
                            <h5>Thông tin khách hàng</h5>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p><strong>Họ tên:</strong> {order[0].Customer.Firstname} {order[0].Customer.Lastname}</p>
                                    <p><strong>Số điện thoại:</strong> {order[0].Customer.Mobile}</p>
                                    <p><strong>Địa chỉ:</strong> {order[0].Customer.Address}</p>
                                    <p><strong>Email:</strong> {order[0].Customer.Email}</p>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
