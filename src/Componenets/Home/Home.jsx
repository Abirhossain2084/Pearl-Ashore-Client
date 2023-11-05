import BannerSection from "./BannerSection";
import FeaturedRooms from "./FeaturedRooms ";
// import MapComponent from "./MapComponent ";
import NewsletterSignup from "./NewsletterSignup";


const Home = () => {
    return (
        <div>
           
            <BannerSection></BannerSection>
            <FeaturedRooms></FeaturedRooms>
            <NewsletterSignup></NewsletterSignup>
      {/* <MapComponent></MapComponent> */}
      
        </div>
    );
};

export default Home;