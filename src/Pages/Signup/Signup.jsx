import { use } from "react";
import "./Signup.css";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import ButtonGoogle from "../../Components/Buttons/ButtonGoogle";

const Signup = () => {
  const { createUser } = use(AuthContext);
   

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
   createUser(email,password,name)
  };
  return (
    <div className="maindics">
      <div className="svgis">
        make it change
      </div>
      <h1 className="logintitle">Sign up</h1>
      <div className="inputfild">
        <form onSubmit={handleSubmit} action="#">
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
          />
          <input name="email" type="email" placeholder="Enter Your Email" />
          <p className="text-red-500" hidden>
            Wrong Email
          </p>
          <input
            name="password"
            type="password"
            placeholder="Enter Your Password"
            required
          />
          <p className="text-red-500" hidden>
            Wrong Email
          </p>
          <button type="submit" className="mt-7 btn btn-primary loginbtn">
            Sign up
          </button>
        </form>

        <p className="font-bold mt-7 ml-3">
          Already have an Account?{" "}
          <Link to="/login" className="text ">
            Login
          </Link>
        </p>
        <ButtonGoogle></ButtonGoogle>
        <button className=" btn btn-primary mt-8 loginbtn">Facebook</button>
      </div>
    </div>
  );
};

export default Signup;
