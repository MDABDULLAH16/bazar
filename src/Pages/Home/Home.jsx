import React from "react";
import Banner from "../../Components/Banner/Banner";
 
import Category from '../../Components/Cataragry/Category';
import TopProducts from "../../Components/TopProducts/TopProducts";
 


const Home = () => {
  
  
  return (
    <div>
 <Banner></Banner>
 <Category></Category>
      
   <TopProducts></TopProducts>
      {/* <Bags></Bags> */}
    </div>
  );
};

export default Home;
