import { FcGoogle } from "react-icons/fc";
import { use } from 'react';
import { AuthContext } from "../../contexts/AuthContext";


const ButtonGoogle = () => {
    const { handleGoogleLogin } = use(AuthContext);
    return (
      <button onClick={handleGoogleLogin} className=" btn btn-primary mt-7 loginbtn">
        <FcGoogle className="text-2xl" /> Google
      </button>
    );
};

export default ButtonGoogle;