import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Carder from '../../Cataragry/Carder';
import  './Bags.css';

const Bags = () => {
    const [user, Setbags] = useState ([]);
    useEffect  (()=>{
        fetch('Bags.json')
        .then(res=>res.json())
        .then(data=>Setbags(data));
    },[])
     return (
        <div className='grid-cols-4 m-20 mb-50'>
            <h1 className='font-bold  text-5xl m-5'><span className='text-red-600'>Categories</span> </h1>
            <div className='grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-1'>
                {
                    user.map(users=><Card
                    
                    users={users}
                    key={users.id}
                    
                    ></Card>)
                }
            </div>
        </div>
    );
};

export default Bags;