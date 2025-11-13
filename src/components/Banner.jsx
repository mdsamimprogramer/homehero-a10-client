import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg",
  "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
  "https://images.pexels.com/photos/4503264/pexels-photo-4503264.jpeg",
  "https://images.pexels.com/photos/5699664/pexels-photo-5699664.jpeg",
  "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-6">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Slide ${current}`}
            className="w-full h-[60vh] object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg"> Discover Trusted HomeHero Services </h1>
          <p className="text-sm mb-6 max-w-2xl text-gray-200"> From electricians to plumbers — find reliable professionals near you, rated by real customers. </p>
          <Link to="/all-services" className="bg-lime-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-lg transition transform hover:scale-105" > Explore Now </Link>
        </div>

        {/* Navigation Buttons */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all ${current === i ? "bg-white w-4" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
