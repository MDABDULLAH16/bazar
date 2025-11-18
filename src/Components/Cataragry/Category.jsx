import Carder from "./Carder";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        // Optional: limit to first 18 categories
        const topCate = data.slice(0, 18);
        setCategories(topCate);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="m-20">
      <h1 className="font-bold text-5xl mb-10">
        <span className="text-red-600">Categories</span>
      </h1>

      <div className="grid lg:grid-cols-9 md:grid-cols-6 grid-cols-3 gap-4">
        {categories.map((category) => (
          <Carder category={category} key={category._id} />
        ))}
      </div>
    </div>
  );
};

export default Category;
