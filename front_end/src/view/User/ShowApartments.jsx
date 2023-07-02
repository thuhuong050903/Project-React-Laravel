import React, { useEffect, useState,useRef } from 'react';
import ApartmentItem from './ApartmentItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const ShowApartments = ({ type_room }) => {
    const [apartments, setApartments] = useState([]);
    const sliderRef = useRef(null);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1500,
        centerMode: true,
        centerPadding: "100px",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    centerMode: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    centerMode: false,
                },
            },
        ],
    };
    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/get-apartment?type_room=${type_room}`);
                const data = await response.json();
                setApartments(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApartments();
    }, [type_room]);

    var slideshow = document.querySelector(".slide");

    // Dừng animation
    function pauseSlideshow() {
        slideshow.style.animationPlayState = "paused";
    }

    // Khởi chạy lại animation
    function resumeSlideshow() {
        slideshow.style.animationPlayState = "running";
    }

    const [slidesData, setSlidesData] = useState([]);
    return (
        <div>
            <Slider {...sliderSettings} ref={sliderRef} >
                {apartments.map((apartment) => (
                    <ApartmentItem key={apartment.apartment_id} apartment={apartment} />
                ))}
            </Slider>
        </div>
    );
};

export default ShowApartments;
