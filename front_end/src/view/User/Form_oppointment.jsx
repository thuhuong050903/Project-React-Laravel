import React from 'react';
import '../../assets/css/Form_oppointment.css';


const Form_oppointment = () => {
  return (
    <div className="desktop-15">
      <div className="thi-gian-bn-mun-dn-vo-parent">
        <b className="thi-gian-bn">Thời gian bạn muốn dọn vào</b>
        <div className="group-child52" />
      </div>
      <div className="thi-gian-xem-phng-parent">
        <b className="thi-gian-bn">Thời gian xem phòng</b>
        <div className="group-child52" />
      </div>
      <div className="t-lch-hn">Đặt lịch hẹn xem phòng</div>
      <img className="icon-x-letter" alt="" src="/-icon-x-letter.svg" />
      <div className="group-parent40">
        <div className="h-v-tn-parent">
          <b className="thi-gian-bn">Họ và tên *</b>
          <div className="group-child52" />
        </div>
        <div className="s-in-thoi-parent">
          <b className="s-in-thoi">Số điện thoại *</b>
          <div className="group-child52" />
          <b className="ddmmyyyy">dd/mm/yyyy</b>
          <b className="ddmmyyyy1">dd/mm/yyyy</b>
        </div>
      </div>
      <div className="qun-bn-quan-tm-parent">
        <b className="thi-gian-bn">Quận bạn quan tâm *</b>
        <div className="group-child52" />
      </div>
      <div className="mc-gi-thu-mong-mun-thng-parent">
        <b className="thi-gian-bn">Mức giá thuê mong muốn/ tháng *</b>
        <div className="group-child52" />
      </div>
      <div className="lin-h-phng-parent">
        <b className="thi-gian-bn">Liên Hệ Phòng</b>
        <div className="group-child52" />
      </div>
      <div className="m-phng-parent">
        <b className="thi-gian-bn">Mã Phòng</b>
        <div className="group-child52" />
      </div>
      <div className="rectangle-parent33">
        <div className="group-child60" />
        <b className="t-lch-hn1">Đặt lịch hẹn xem phòng</b>
      </div>
      <div className="desktop-15-child" />
      <b className="bn-vui-lng">Bạn vui lòng nhập đủ các trường bắt buộc.</b>
      <img className="icon-calendar" alt="" src="/-icon-calendar.svg" />
      <img className="icon-calendar1" alt="" src="/-icon-calendar1.svg" />
    </div>
  );
};
export default Form_oppointment;