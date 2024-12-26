import React from "react";
const UserProfiless = ()=>{
    return(
        <div className="card mt-3">
  <div className="card-header">
    <h3>Chi tiết đơn hàng</h3>
  </div>
  <div className="card-body">
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">Tên sản phẩm</label>
      <div className="col-sm-9">
        <p>Giày thể thao Nike</p>
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">Số lượng</label>
      <div className="col-sm-9">
        <p>2</p>
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">Giá ban đầu</label>
      <div className="col-sm-9">
        <p>1,000,000 VND</p>
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">Giá sau giảm giá</label>
      <div className="col-sm-9">
        <p>900,000 VND</p>
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">Thông tin người đặt</label>
      <div className="col-sm-9">
        <p><strong>Nguyễn Văn A</strong></p>
        <p>Phone: 0123456789</p>
        <p>Địa chỉ: Hà Nội, Việt Nam</p>
      </div>
    </div>
  </div>
</div>

    )
}
export default UserProfiless