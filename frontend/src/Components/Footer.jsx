import React from "react";
import cure from "../assets/cure.png";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* -----------Left Section----------- */}
        <div>
          <img className="mb-5 w-60" src={cure} alt="Cure" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            The herbal cure system, also known as herbal medicine, uses
            plant-based remedies to prevent and treat various health conditions.
            It emphasizes natural healing by leveraging the medicinal properties
            of herbs, focusing on holistic well-being and minimal side effects.
          </p>
        </div>

        {/* -----------Center Section----------- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* -----------Right Section----------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li> +92-22-480-1060</li>
          </ul>
        </div>
      </div>
      {/* --------Copyright Text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 HerbalCureSystem - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
