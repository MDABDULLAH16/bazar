import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";

const ButtonGoogle = () => {
  const { handleGoogleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogle = () => {
    handleGoogleLogin().then((result) => {
            const user = result.user;
      console.log(user);
      navigate(from,{replace:true})
          })
          .catch((err) => console.log(err.message));
      
  };

  return (
    <button onClick={handleGoogle} className="btn btn-primary mt-7 loginbtn">
      <FcGoogle className="text-2xl" /> Google
    </button>
  );
};

export default ButtonGoogle;
