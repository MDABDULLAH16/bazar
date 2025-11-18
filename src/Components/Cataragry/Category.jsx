 import Carder from './Carder';
import { useEffect, useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Category = () => {
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        fetch(`${BACKEND_URL}/products`)
          .then((res) => res.json())
          .then((data) => {
            const categories = [
              ...new Map(data.map((user) => [user.name, user])).values(),
            ];
            const topCate = categories.slice(0, 18);
            setCategories(topCate);
          });
    },[])
    
    
  
    return (
        <div className='grid-cols-5 m-20 '>
            <h1 className='font-bold  text-5xl m-5'><span className='text-red-600'>Categories</span> </h1>
            <div className='grid lg:grid-cols-9  md:grid-cols-6 grid-cols-3 gap-2'>
                {categories.map(category=><Carder category={category} key={category.id}></Carder>)}
            </div>
        </div>
    );
};

export default Category;