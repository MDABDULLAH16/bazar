 
import { Outlet } from 'react-router';
import Navbar from './../Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Root = () => {
  const {loading}= use(AuthContext)
  return (
    <div>
      <Navbar></Navbar>
      {loading && (
        <span className="loading loading-spinner text-warning  "></span>
      )}
      <Outlet></Outlet>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Root;
