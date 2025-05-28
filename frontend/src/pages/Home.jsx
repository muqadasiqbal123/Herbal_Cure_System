import React from "react";
import Header from "../Components/Header";
import SpecialityMenu from "../Components/SpecialityMenu";
import TopHerbalists from "../Components/TopHerbalists";
import Banner from "../Components/Banner";
const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopHerbalists />
      <Banner />
    </div>
  );
};

export default Home;
