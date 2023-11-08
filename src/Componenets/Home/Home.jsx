
import BannerSection from "./BannerSection";
import FeaturedRooms from "./FeaturedRooms ";
import HomeOfferBanner from "./HomeOfferBanner";
import HomeTestimonial from "./HomeTestimonial";
// import MapComponent from "./MapComponent ";
import NewsletterSignup from "./NewsletterSignup";


const Home = () => {
    return (
        <div>
           
            <BannerSection></BannerSection>
            <FeaturedRooms></FeaturedRooms>
            <NewsletterSignup></NewsletterSignup>
      {/* <MapComponent></MapComponent> */}

      <HomeTestimonial></HomeTestimonial>
      <HomeOfferBanner></HomeOfferBanner>
      
        </div>
    );
};

export default Home;