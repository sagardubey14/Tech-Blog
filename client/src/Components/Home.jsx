import Header from './homeComponents/Header';
import Hero from './homeComponents/Hero';
import FeaturedSolutions from './homeComponents/FeaturedSolutions';
import Categories from './homeComponents/Categories';
import Testimonials from './homeComponents/Testimonials';
import Footer from './homeComponents/Footer';

function Home() {
  return (
    <div className="Home">
      <Header />
      <Hero />
      <FeaturedSolutions />
      <Categories />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home;
