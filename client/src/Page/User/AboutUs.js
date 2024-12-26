import React from "react";
const AboutUs =()=>{
    return(
        <>
          <div className="breadcrumb-section breadcrumb-bg-color--golden">
            <div className="breadcrumb-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="breadcrumb-title">Về chúng tôi</h3>
                            <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  <div className="about-top">
    <div className="container">
      <div className="row d-flex align-items-center justify-content-between d-sm-column">
        <div className="col-md-6">
          <div className="about-img" data-aos="fade-up" data-aos-delay={0}>
            <div className="img-responsive">
              <img src="/images/about/img-about.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content" data-aos="fade-up" data-aos-delay={200}>
            <h3 className="title">VỀ CỬA HÀNG XE ĐẠP THỂ THAO CỦA CHÚNG TÔI</h3>
            <h5 className="semi-title">
              Bike.vn
            </h5>
            <p>
            Chúng tôi tin rằng mỗi chuyến đi bắt đầu từ đam mê và mỗi chiếc xe đạp đều kể một câu chuyện. Tại cửa hàng của chúng tôi, chúng tôi cam kết cung cấp những chiếc xe đạp thể thao chất lượng cao giúp bạn theo đuổi hành trình của mình, bất kể con đường dẫn bạn đi đâu.
            Mỗi chiếc xe đạp mà chúng tôi cung cấp đều được lựa chọn, thiết kế và chế tạo để đáp ứng các tiêu chuẩn cao nhất về hiệu suất, độ bền và sự thoải mái. Đội ngũ của chúng tôi luôn nỗ lực hết mình để đảm bảo mỗi chiếc xe đạp đều phù hợp hoàn hảo với nhu cầu của bạn. Chúng tôi hiểu rằng sự hoàn hảo là một hành trình, không phải một đích đến, vì vậy chúng tôi tập trung vào những chi tiết quan trọng nhất.
            Với đôi mắt sáng tạo và cam kết không ngừng về chất lượng, chúng tôi phấn đấu mang đến những sản phẩm không chỉ đáp ứng mà còn vượt xa mong đợi của bạn. Hãy cùng chúng tôi theo đuổi sự xuất sắc và tận hưởng mỗi chuyến đi với sự tự tin rằng bạn đã chọn lựa những chiếc xe đạp tốt nhất.
            Cùng nhau, chúng ta sẽ chinh phục mọi chặng đường.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End About Top */}
  {/* Start Service Section */}
  <div className="service-promo-section section-top-gap-100">
    <div className="service-wrapper">
      <div className="container">
        <div className="row">
          {/* Start Service Promo Single Item */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div
              className="service-promo-single-item"
              data-aos="fade-up"
              data-aos-delay={0}
            >
              <div className="image">
                <img src="/images/icons/icon_about1.jpg" alt="" />
              </div>
              <div className="content">
                <h6 className="title">Creative Always</h6>
                
              </div>
            </div>
          </div>
          {/* End Service Promo Single Item */}
          {/* Start Service Promo Single Item */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div
              className="service-promo-single-item"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="image">
                <img src="/images/icons/icon_about2.jpg" alt="" />
              </div>
              <div className="content">
                <h6 className="title">Express Customization</h6>
               
              </div>
            </div>
          </div>
          {/* End Service Promo Single Item */}
          {/* Start Service Promo Single Item */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div
              className="service-promo-single-item"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <div className="image">
                <img src="/images/icons/icon_about3.jpg" alt="" />
              </div>
              <div className="content">
                <h6 className="title">Premium Integrations</h6>
                
              </div>
            </div>
          </div>
          {/* End Service Promo Single Item */}
          {/* Start Service Promo Single Item */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div
              className="service-promo-single-item"
              data-aos="fade-up"
              data-aos-delay={600}
            >
              <div className="image">
                <img src="/images/icons/icon_about4.jpg" alt="" />
              </div>
              <div className="content">
                <h6 className="title">Real-time Editing</h6>
                
              </div>
            </div>
          </div>
          {/* End Service Promo Single Item */}
        </div>
      </div>
    </div>
  </div>
  {/* End Service Section */}
</>

    )
}
export default AboutUs;