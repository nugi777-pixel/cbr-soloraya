import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { image: "https://source.unsplash.com/800x400/?charity", caption: "Bakti Sosial Solo Raya" },
  { image: "https://source.unsplash.com/800x400/?education", caption: "Workshop & Edukasi" },
  { image: "https://source.unsplash.com/800x400/?community", caption: "Persaudaraan & Volunteer" },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded overflow-hidden shadow-lg">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img src={slides[index].image} alt={slides[index].caption} className="w-full h-96 object-cover" />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
            {slides[index].caption}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-red-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
