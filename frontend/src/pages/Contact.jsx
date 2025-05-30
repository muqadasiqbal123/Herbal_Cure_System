import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          {" "}
          CONTACT <span className="text-gray-700 font-semibold"> US </span>{" "}
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=" Contact Image"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Lahore, PAKISTAN
          </p>
          <p className="text-gray-500">
            Tel: (+92)224801060 <br /> Email: muqadasiqbal643@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            HERBAL CURE SYSTEM{" "}
          </p>
          <p className="text-gray-500">
            Support Hours: Mon-Sat, 9:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
