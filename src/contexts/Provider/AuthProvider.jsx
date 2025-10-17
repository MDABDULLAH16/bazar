import { AuthContext } from "../AuthContext";

const AuthProvider = ({ children }) => {
  const authInfo = {
    email: "new user",
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
