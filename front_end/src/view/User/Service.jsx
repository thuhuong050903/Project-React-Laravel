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
              <h1 class="postcard__title green">Dịch Vụ Sửa Ống Nước</h1>
                <h1 className="postcard__title blue">
                  <a href="#">{service.title}</a> 
                </h1>
                <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                  {service.description}
                  <h1 className="postcard__title blue"> Giá:
                  {service.price}
                </h1>
                </div>
                <ul className="postcard__tagbox">
                  <li className="tag__item play blue">
                  <h1 className="postcard__title blue"> 
                  <a href="#">{service.contact_info}</a>
                </h1>
                      <i className="fas fa-play mr-2"></i>Contact
                  </li>
                </ul>
              </div>
            </article>
          ))}
          <article class="postcard dark red">
            <a class="postcard__img_link" href="#">
              <img
                class="postcard__img"
                src="https://picsum.photos/501/500"
                alt="Image Title"
              />
            </a>
            <div class="postcard__text">
              <h1 class="postcard__title red">
                <a href="#">Podcast Title</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
              <ul class="postcard__tagbox">
                <li class="tag__item play red">
                  <a href="#">
                    <i class="fas fa-play mr-2"></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
          <article class="postcard dark green">
            <a class="postcard__img_link" href="#">
              <img
                class="postcard__img"
                src="https://picsum.photos/500/501"
                alt="Image Title"
              />
            </a>
            <div class="postcard__text">
              <h1 class="postcard__title green">
                <a href="#">Podcast Title</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
              <ul class="postcard__tagbox">
                <li class="tag__item play green">
                  <a href="#">
                    <i class="fas fa-play mr-2"></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
          <article class="postcard dark yellow">
            <a class="postcard__img_link" href="#">
              <img
                class="postcard__img"
                src="https://picsum.photos/501/501"
                alt="Image Title"
              />
            </a>
            <div class="postcard__text">
              <h1 class="postcard__title yellow">
                <a href="#">Podcast Title</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
              <ul class="postcard__tagbox">
                <li class="tag__item play yellow">
                  <a href="#">
                    <i class="fas fa-play mr-2"></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section class="light">
        <div class="container py-2">
          <div class="h1 text-center text-dark" id="pageHeaderTitle">
            My Cards Light
          </div>

          <article class="postcard light blue">
            <a class="postcard__img_link" href="#">
              <img
                class="postcard__img"
                src="https://picsum.photos/1000/1000"
                alt="Image Title"
              />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title blue">
                <a href="#">Podcast Title</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
              <ul class="postcard__tagbox">
                <li class="tag__item play blue">
                  <a href="#">
                    <i class="fas fa-play mr-2"></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
          <article class="postcard light red">
            <a class="postcard__img_link" href="#">
              <img
                class="postcard__img"
                src="https://picsum.photos/501/500"
                alt="Image Title"
              />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title red">
                <a href="#">Podcast Title</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
              <ul class="postcard__tagbox">
                <li class="tag__item play red">
                  <a href="#">
                    <i class="fas fa-play mr-2"></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
          <article class="postcard light green">
            <a class="postcard__img_link" href="#">
              <img
                class="postcard__img"
                src="https://picsum.photos/500/501"
                alt="Image Title"
              />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title green">
                <a href="#">Podcast Title</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
              <ul class="postcard__tagbox">
                <li class="tag__item play green">
                  <a href="#">
                    <i class="fas fa-play mr-2"></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
          <article class="postcard light yellow">
            <a class="postcard__img_link" href="#">
              <img
                class="postcard__img"
                src="https://picsum.photos/501/501"
                alt="Image Title"
              />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title yellow">
                <a href="#">Podcast Title</a>
              </h1>
              <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
              <ul class="postcard__tagbox">
                <li class="tag__item play yellow">
                  <a href="#">
                    <i class="fas fa-play mr-2"></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Service;
