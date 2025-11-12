import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const videos = [
  "https://cdn.dribbble.com/userupload/44360845/file/4988e26dadf995df34b5bfde3d04d45d.mp4",
  "https://cdn.dribbble.com/userupload/44953456/file/76723a83e127562547a28df5001d257b.webm",
  "https://cdn.dribbble.com/userupload/16569515/file/original-d99071d642c8efd87400222a0c344e1a.mp4",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play the carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + videos.length) % videos.length);
  const nextSlide = () => setCurrent((current + 1) % videos.length);

  return (
    <>
      <div className="absolute w-full flex top-0 left-0 justify-center ">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full overflow-hidden bg-black rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {videos.map((src, i) => (
                <div key={i} className="w-full shrink-0 relative">
                  <video src={src} autoPlay loop muted playsInline className="w-full h-[60vh] object-cover brightness-90" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 md:px-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg"> Discover Trusted Home-hero Services </h1>
              <p className="text-sm mb-6 max-w-2xl text-gray-200">
                From electricians to plumbers — find reliable professionals near you,
                rated by real customers. Simplify your home service needs today!
              </p>
              <Link to="/all-services" className="bg-lime-500 hover:green-600 text-white font-sm px-6 py-1.5 rounded-full shadow-lg transition transform hover:scale-105" >
                Explore Now
              </Link>
            </div>

            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition" >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition" >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-all ${current === i ? "bg-white w-4" : "bg-white/50"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[550px] md:mb-[480px]"></div>
    </>
  );
};

export default Banner;
