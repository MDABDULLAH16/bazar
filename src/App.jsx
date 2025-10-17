import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Home/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import About from "./Components/About/About";
import RequestProducts from "./Components/Request_Products/Request_Products";
import Home from "./Components/Home/Homi/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route
          path="/Request_Products"
          element={<RequestProducts></RequestProducts>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
