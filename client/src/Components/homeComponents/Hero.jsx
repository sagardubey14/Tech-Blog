import React from 'react';

const Hero = () => {
  return (
    <div>
      <section className="bg-blue-500 text-white p-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find Solutions to Your Coding Queries
        </h1>
        <button className="bg-white text-blue-500 px-4 py-2 rounded">
          Start Searching
        </button>
        <div className="hero-section mt-10  bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Write. Share. Inspire.</h1>
            <p className="text-xl mb-6">
              SyntaxScribe helps developers and tech enthusiasts create and
              share rich, interactive blog posts with ease.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/signup"
                className="btn-primary px-8 py-3 rounded-full bg-yellow-500 text-black font-semibold"
              >
                Get Started for Free
              </a>
              <a
                href="#features"
                className="btn-secondary px-8 py-3 rounded-full bg-transparent border-2 border-white text-white font-semibold"
              >
                Explore Features
              </a>
            </div>
            <div className="mt-10">
              {/* <img src="hero-image.png" alt="Hero Image" class="mx-auto rounded-lg shadow-lg"> */}
              <h3 className="text-xl ml-3 font-bold text-blue-900">Logo</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
