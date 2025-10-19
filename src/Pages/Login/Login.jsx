import { Link } from "react-router";
import "./Login.css";
 
import { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ButtonGoogle from "../../Components/Buttons/ButtonGoogle";
// import ButtonFacebook from "../../Components/Buttons/ButtonFacebook";
// import { getAuth } from "firebase/auth";
// import app from "../../Firebase.int";

const Login = () => {
 const { loginUser,  } = use(AuthContext);

  const submit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    loginUser(email,password)
    
  };

  return (
    <div className="maindic">
      <div className="svgis">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FBBD23"
            fillOpacity="1"
            d="M0,224L34.3,208C68.6,192,137,160,206,170.7C274.3,181,343,235,411,266.7C480,299,549,309,617,304C685.7,299,754,277,823,224C891.4,171,960,85,1029,96C1097.1,107,1166,213,1234,245.3C1302.9,277,1371,235,1406,213.3L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
      </div>
      <h1 className="logintitle">Login</h1>
      <div className="inputfild">
        <form onSubmit={submit} action="#">
          <input name="email" type="email" placeholder="Enter Your Email" />
          <p className="text-red-500" hidden>
            Wrong Email
          </p>
          <input
            name="password"
            type="password"
            placeholder="Enter Your Password"
          />
          <p className="text-red-500" hidden>
            Wrong Password
          </p>
          <button type="submit" className="mt-7 btn btn-primary loginbtn">
            Login
          </button>
        </form>
        <p className="forgetpass mt-5 mb-5 ">Forget Password</p>
        <p className="">
          Create a New Account?{" "}
          <Link to="/signup" className="text ">
            Sing up
          </Link>
        </p>
       <ButtonGoogle ></ButtonGoogle>
       {/* <ButtonFacebook></ButtonFacebook> */}
      
      </div>
    </div>
  );
};

export default Login;
