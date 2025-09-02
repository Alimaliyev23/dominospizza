import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { path } from "../App";
const sliders = [
  "6-neferlik-hezz.png",
  "1360-350-min.png",
  "SuperOnline.png",
  "tacoSlide.png",
  "Pizzas1360x350-jpg.png",
];
export default function MySlider() {
  const progressFill = useRef(null);
  const autoplayDelay = 3000;
  const onAutoplayTimeLeft = (swiper, timeLeft, percentage) => {
    const progress = (1 - percentage) * 100;
    if (progressFill.current) {
      progressFill.current.style.width = `${progress}%`;
    }
  };
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "100%",
        margin: "15px auto",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        className="slider-progress-bar"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "5px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          zIndex: 10,
          borderRadius: "5px",
        }}
      >
        <div
          className="progress-fill"
          ref={progressFill}
          style={{
            height: "100%",
            width: "0%",
            backgroundColor: "#FF6F61",
            transition: "width 0.1s linear",
            borderRadius: "5px",
          }}
        />
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        style={{
          width: "100%",
          height: "80%",
          borderRadius: "8px",
        }}
      >
        {sliders.map((imgName, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${path}${imgName}`}
              alt={`slide ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "8px",
              }}
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/1360x350/cccccc/333333?text=Image+Not+Found";
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
