import Hero from './homeComponents/Hero';
import FeaturedSolutions from './homeComponents/FeaturedSolutions';
import Categories from './homeComponents/Categories';
import Testimonials from './homeComponents/Testimonials';

function Home() {
  return (
    <div className="Home">
      <Hero />
      <FeaturedSolutions />
      <Categories />
      <Testimonials />
    </div>
  );
}

export default Home;
