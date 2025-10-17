import React from "react";
import "./Catagory.css";

const Carder = ({ category }) => {
  const { img, name } = category;
  return (
    <div title={name} className="bg-base-100 shadow-sm rounded-lg overflow-hidden w-full transition-transform duration-300 hover:scale-105 ">
      <img src={img} alt={name} className="w-full aspect-square object-cover" />
      {/* Optional: Show name below */}
      {/* <div className="p-2 text-center">
        <small className="text-gray-600 dark:text-gray-300">{name}</small>
      </div> */}
    </div>
  );
};

export default Carder;
