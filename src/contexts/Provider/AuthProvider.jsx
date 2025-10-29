import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../AuthContext";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
const GoogleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 

  // ✅ Create User + Update displayName
  const createUser = async (email, password, name) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = result.user;

      await updateProfile(newUser, { displayName: name });
      toast.success("Account created successfully!");

      setUser({ ...newUser, displayName: name });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login User
  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully!");
      setUser(result.user);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Listen for Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ✅ Sign in with GOogle;
  const handleGoogleLogin = () => {
    return signInWithPopup(auth, GoogleProvider).then(result => {
      const logged = result.user;
      console.log(logged);
      if (logged) {
        toast.success('User Login Successfully!!')
        return <Navigate to='/'></Navigate>
      }
      
    }).catch(err => {
      toast.error(err)
    })
  }
  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    handleGoogleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
