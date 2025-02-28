import React from "react";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-gray-100 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Learn on your schedule
          </h1>
          <p className="text-xl mb-8">
            Study any topic, anytime. Choose from thousands of expert-led
            courses now.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="absolute right-2 top-1 bg-blue-500 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
              <FaSearch size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
