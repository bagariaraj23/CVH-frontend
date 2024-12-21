"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Data for each slide with image and overlay cards
const slides = [
  {
    image: "/img/portrait-african-american.jpg", // Adjust these paths to match your images
    appointments: [
      {
        title: "AI Summarize Note",
        time: "01:00PM - 02:00PM",
        tag: "AI Note",
        color: "#CBACF9",
      },
      {
        title: "Client Appointment",
        time: "02:00PM - Alison R",
        tag: "Video Call",
        color: "#A8C8FF",
      },
      {
        title: "Invoice Payment",
        time: "02:00PM - James P",
        tag: "Payment Processed",
        color: "#FFDEFF",
      },
    ],
  },
  {
    image: "/img/young-female.jpg",
    appointments: [
      {
        title: "Team Meeting",
        time: "10:00AM - 11:00AM",
        tag: "Meeting",
        color: "#A8C8FF",
      },
      {
        title: "Project Update",
        time: "01:00PM - 01:30PM",
        tag: "Update",
        color: "#FFDEFF",
      },
    ],
  },
];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="py-10 bg-gradient-to-b from-gray-100 to-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              width={500} // Adjusted width for desktop
              height={300} // Adjusted height for desktop
              className="object-cover w-full h-full"
            />

            {/* Overlay Cards */}
            <div className="absolute top-5 right-5 space-y-4 md:top-10 md:right-10">
              {slide.appointments.map((appointment, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md p-3 flex items-center space-x-3 md:p-4"
                >
                  <div className="text-gray-900 font-medium">
                    <h3 className="text-sm md:text-base">{appointment.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {appointment.time}
                    </p>
                  </div>
                  <button
                    style={{ backgroundColor: appointment.color }}
                    className="text-white font-medium text-xs md:text-sm px-2 py-1"
                  >
                    {appointment.tag}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ImageSlider;
