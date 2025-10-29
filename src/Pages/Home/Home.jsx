import React from "react";
import Banner from "../../Components/Banner/Banner";
 
import Category from '../../Components/Cataragry/Category';
import TopProducts from "../../Components/TopProducts/TopProducts";
import Footer from "../../Components/Footer/Footer";
 


const Home = () => {
  
  
  return (
    <div>
 <Banner></Banner>
 <Category></Category>
      
   <TopProducts></TopProducts>
      {/* <Bags></Bags> */}
      <Footer></Footer>
    </div>
  );
};

export default Home;
