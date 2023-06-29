import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../assets/style/Service.css";

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get-service")
      .then((response) => setServices(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <section className="dark">
        <div className="container py-4">
          <h1 className="h1 text-center" id="pageHeaderTitle">
            DỊCH VỤ CỦA CHÚNG TÔI
          </h1>
          

          {services.map((service) => (
            <article key={service.id} className="postcard dark blue">
              <a className="postcard__img_link" href="#">
                <img
                  className="postcard__img"
                  src={service.img}
                  alt={service.title}
                />
              </a>
              <div className="postcard__text">
                <h1 class="postcard__title3"></h1>
                <h1 className="postcard__title4">
                  <a>{service.title}</a>
                </h1>
                <div class="postcard__subtitlesmall">
                  <time datetime="2020-05-25 12:00:00">
                    <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                  </time>
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                  {service.description}
                  <br />
                  <br />
                  <h1 className="postcard__title2 blue">
                    {" "}
                    Giá:
                    {service.price}
                  </h1>
                  
                  <h1 className="postcard__title8 blue">Điện thoại: <a href="#">{service.phone}</a></h1>
                    <h1 className="postcard__title8 blue">Email: <a href="#">{service.contact_info}</a>
                    </h1>
                </div>
                 
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Service;
