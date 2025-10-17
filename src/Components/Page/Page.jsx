import React, { useEffect, useState } from 'react';

const Page = ({showparPage,onPaginationChange,total}) => {


    const [counter, setCounter]=useState(1);
    useEffect(()=>{

        const value = showparPage *counter;
        onPaginationChange(value-showparPage, value);

    },[counter]);

    const onButtonClick = (type)=>{
        if(type==="pre"){
            if(counter===1){
                setCounter(1)
            }
            else{
                setCounter(counter-1);
            }
        }
        else if (type==="next"){
            if(Math.ceil(total/showparPage)===counter){
                setCounter(counter);
            }
            else{
                setCounter(counter+1)
            }
        }
    }


    return (

            <div className=" flex  bg-slate-300 p-10 mt-9 mb-20  justify-between">
           <div>
          <div onClick={()=>onButtonClick("pre")} className="btn ">
            Previous
          </div>
           </div>
            <div>
           <div onClick={()=>onButtonClick("next")} className="btn">
            Next
           </div>
            </div>
            </div>
    );
};

export default Page;