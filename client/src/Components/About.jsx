import { Link } from 'react-router-dom';
import logo from '../assets/HeroLogo.png';

const About = () => {
  return (
    <div className="bg-darkBlue min-h-screen flex items-center justify-center text-white">
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-darkBlue to-coral shadow-md rounded-lg">
        <div className="mb-5">
          <img
            src={logo}
            alt="Hero Image"
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center font-roboto-mono text-gold">About Our Tech Blog</h1>
        <p className="text-lg font-source-sans-pro text-lightGrey mb-4">
          Welcome to our Tech Blog! This platform is designed for developers to share and discover coding solutions.
          Whether you are a beginner or an expert, you can find valuable content to help you solve your coding problems.
        </p>
        <p className="text-lg font-source-sans-pro text-lightGrey mb-4">
          Our goal is to create a community where developers can easily share their knowledge and learn from each other.
          You can create posts with detailed descriptions, keywords, and code snippets. Other users can search for specific
          queries, follow each other, like, save, and comment on posts.
        </p>
        <p className="text-lg font-source-sans-pro text-lightGrey mb-4">
          Join us in building a rich repository of coding solutions and become a part of our growing developer community.
          Happy coding!
        </p>
        <div className="text-center mt-6">
          <Link to="/signup" className="text-gold hover:underline">Sign up</Link> to start sharing your knowledge today!
        </div>
      </div>
    </div>
  );
};

export default About;
