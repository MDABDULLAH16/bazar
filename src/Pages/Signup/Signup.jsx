import { useState } from "react";
import { useForm } from "react-hook-form";
 
import { Link, Navigate, useLocation, useNavigate } from "react-router";
 
import { toast } from "react-toastify";
import axios from "axios";
 
import useAuth from "../../hooks/useAuth";
import GoogleSignIn from "../../Components/Buttons/ButtonGoogle";

const Signup = () => {
  const { createUser, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const photo = data.photo[0];
    createUser(data.email, data.password)
      .then((result) => {
      console.log({result});
      
        //image store first in image;
        const formData = new FormData();
        formData.append("image", photo);
        //ibb url key
        const imageHostKey = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(`${imageHostKey}`, formData).then(async (res) => {
          //make user info
          console.log({res});
          
          const profileInfo = {
            displayName: data.name,
            photoURL: res.data?.data?.display_url,
          };
          await updateUserInfo(profileInfo)
            .then((d) => {
              console.log("profile update done", d);
              const user = result.user;
              console.log({user});
              
              console.log("user", user.displayName, user.photoURL);
              const newUser = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                role: "user",
              };
              console.log("nwe user", newUser);

              axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/users`, newUser)
                .then((res) => {
                  if (res.data.insertedId) {
                    toast.success("Register Successful!!");
                    navigate(from, { replace: true });
                  }
                });
            })
            .catch((err) => console.log(err));
        });

        //apply db functionality;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };



return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center mb-4">Create an Account</h1>
      <p className="text-center text-gray-600 mb-6">Register with UrbanCart</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* File Input as Button */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Choose an Profile image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Image is required!" })}
            className=" file-input-bordered w-full"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message ||
                "Password must be at least 6 characters"}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white mt-3"
        >
          Register
        </button>
      </form>

      <p className="text-center mt-5 text-sm text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium">
          Login
        </Link>
      </p>

      <div className="divider my-6">Or Continue With</div>
      <GoogleSignIn />
    </div>
  </div>
);

};

export default Signup;
