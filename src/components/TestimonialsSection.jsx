import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import test1 from "../assets/test1.png";
import test2 from "../assets/test2.png";
import test3 from "../assets/test3.png";
import statsVideo from "../assets/testviedo.mp4"; // 🎥 Your autoplay video here

const TestimonialsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null);

  const stats = [
    { value: "26+", label: "Finalized Projects" },
    { value: "98%", label: "Client satisfaction rate" },
    { value: "10M", label: "Gross Revenue" },
  ];

  const testimonials = [
    {
      quote:
        "Clear, thoughtful, and fast — Franklin made the whole process effortless.",
      author: "Olivia Tran",
      position: "Creative Director, Bloom Agency",
      image: test1,
    },
    {
      quote:
        "Outstanding work and exceptional attention to detail. Highly recommend!",
      author: "Marcus Johnson",
      position: "CEO, Tech Innovations",
      image: test2,
    },
    {
      quote:
        "Professional, creative, and delivered beyond our expectations.",
      author: "Sarah Chen",
      position: "Marketing Director, Wave Digital",
      image: test3,
    },
  ];

  // ✅ Clone first slide for infinite scroll effect
  const extendedSlides = [...testimonials, testimonials[0]];

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // ✅ Loop back without flicker
  useEffect(() => {
    if (currentSlide === testimonials.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentSlide, testimonials.length]);

  return (
<div className="min-h-screen bg-[#dbdbdb] flex flex-col items-center -mt-24 justify-center px-4 md:px-8 relative overflow-hidden">

  {/* Small Subtitle */}
  <p className="text-center text-gray-500 text-xs sm:text-sm md:text-base tracking-wide mb-2 z-10 relative">
    (Why clients love Agero)
  </p>

  {/* Massive Background Heading */}
  <h1
    className="absolute top-[6%] md:top-[5%] left-1/2 -translate-x-1/2
    text-[18vw] md:text-[12rem] lg:text-[13rem] font-bold 
    tracking-tight leading-[0.85]
    bg-[linear-gradient(180deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.05)_100%)]
    bg-clip-text text-transparent opacity-40
    select-none z-0 pointer-events-none"
  >
    Testimonials
  </h1>

  {/* Foreground Content */}
  <div className="relative z-10 max-w-6xl w-full mt-24 md:mt-32">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 pb-20">

      {/* Left Stats */}
      <div
        className="relative lg:col-span-4 rounded-3xl overflow-hidden 
        flex flex-col justify-center p-6 sm:p-8 md:p-9 text-white
        h-[350px] sm:h-[400px] md:h-[460px]"
      >
        <video
          src={statsVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col h-full justify-center text-sm sm:text-base">
          {stats.map((stat, index) => (
            <div key={index} className="mb-6 sm:mb-8 last:mb-0">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm sm:text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Carousel */}
      <div
        className="lg:col-span-8 relative rounded-3xl overflow-hidden 
        h-[380px] sm:h-[420px] md:h-[460px]"
      >
        <div
          ref={carouselRef}
          className={`flex h-full ${
            isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {extendedSlides.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-full relative bg-cover bg-center"
              style={{ backgroundImage: `url(${testimonial.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
                <div className="text-white/80 text-xs sm:text-sm font-medium">
                  {String((index % testimonials.length) + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </div>

                <div>
                  <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
                    “{testimonial.quote}”
                  </p>

                  <div>
                    <div className="text-white font-semibold text-sm sm:text-lg">
                      {testimonial.author}
                    </div>
                    <div className="text-white/70 text-xs sm:text-sm">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="absolute bottom-5 md:bottom-10 right-5 md:right-10 flex gap-2 sm:gap-3 z-20">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 sm:p-3 transition-all"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 sm:p-3 transition-all"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default TestimonialsCarousel;
