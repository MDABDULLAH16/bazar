 
import Carder from './Carder';
import { useEffect, useState } from 'react';

const Category = () => {
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        fetch('Products.json').then(res => res.json()).then(data => {
            const categories = [
              ...new Map(data.map((user) => [user.name, user])).values(),
            ];
            setCategories(categories)
        })
    },[])
    
    
  
    return (
        <div className='grid-cols-5 m-20 '>
            <h1 className='font-bold  text-5xl m-5'><span className='text-red-600'>Categories</span> </h1>
            <div className='grid lg:grid-cols-10  md:grid-cols-8 grid-cols-6 gap-2'>
                {categories.map(category=><Carder category={category} key={category.id}></Carder>)}
            </div>
        </div>
    );
};

export default Category;