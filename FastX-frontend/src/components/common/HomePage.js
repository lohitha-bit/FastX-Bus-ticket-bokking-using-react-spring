import HeroSection from './HeroSection';
import SearchForm from './SearchForm';
import WhyChooseUs from './WhyChooseUs';


const HomePage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <HeroSection />
      <SearchForm />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
