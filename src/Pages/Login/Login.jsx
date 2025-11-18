import { Link, useLocation, useNavigate } from "react-router";
import "./Login.css";
 
import { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ButtonGoogle from "../../Components/Buttons/ButtonGoogle";
// import ButtonFacebook from "../../Components/Buttons/ButtonFacebook";
// import { getAuth } from "firebase/auth";
// import app from "../../Firebase.int";

const Login = () => {
  const { loginUser, } = use(AuthContext);
  const location = useLocation()
  const navigate = useNavigate()
 const from = location.state?.from?.pathname || "/";

  const submit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    loginUser(email, password).then(result => {
      const user = result;
      console.log(user);
      
            
        navigate(from,{replace:true})
   
    })
    
  };

  return (
    <div className="maindic">
      <div className="svgis">
       make it change
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
