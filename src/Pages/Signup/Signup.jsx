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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FBBD23"
            fillOpacity="1"
            d="M0,224L34.3,208C68.6,192,137,160,206,170.7C274.3,181,343,235,411,266.7C480,299,549,309,617,304C685.7,299,754,277,823,224C891.4,171,960,85,1029,96C1097.1,107,1166,213,1234,245.3C1302.9,277,1371,235,1406,213.3L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
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
