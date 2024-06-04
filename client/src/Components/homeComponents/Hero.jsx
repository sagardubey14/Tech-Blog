
const Hero = () => {
  return (
    <div>
      <section className="bg-blue-500 text-white p-10 sm:p-20 sm:pt-48  text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">
          Find Solutions to Your Coding Queries
        </h1>
        <div className="w-full sm:w-auto mt-4 sm:mt-0 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search for solutions..."
            className="w-full max-w-[10cm] sm:max-w-xs p-2 rounded flex-grow"
          />
          <button className="bg-white text-blue-500 py-2 px-4 rounded ml-2">
            Search
          </button>
        </div>
        <div className="hero-section mt-10  bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">Write. Share. Inspire.</h1>
            <p className="text-xl sm:text-xl mb-6">
              SyntaxScribe helps developers and tech enthusiasts create and
              share rich, interactive blog posts with ease.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/signup"
                className="btn-primary px-6 py-3 sm:px-8 rounded-full bg-yellow-500 text-black font-semibold"
              >
                Get Started for Free
              </a>
              <a
                href="#features"
                className="btn-secondary px-6 py-3 sm:px-8 rounded-full bg-transparent border-2 border-white text-white font-semibold"
              >
                Explore Features
              </a>
            </div>
            <div className="mt-10">
              {/* <img src="hero-image.png" alt="Hero Image" class="mx-auto rounded-lg shadow-lg"> */}
              <h3 className="text-xl sm:text-xl ml-3 font-bold text-blue-900">Logo</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
