import React from "react";
import Container from "../../Components/Container/Container";
// import logo from "/logo.png";
import { toast } from "react-toastify";

const Footer = () => {
  const handleSubscribe = () => {
    toast.success("Thank for subscribe!!");
  };
  const date = new Date().getFullYear();
  return (
    <div className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
      <Container>
        <section className=" ">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
              {/* Logo and Description */}
              <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                <div className="flex items-center">
                  {" "}
                  {/* <img height={80} width={80} src={logo} alt="" />{" "} */}
                  <span className="text-5xl font-bold text-yellow-500">
                    Bazar
                  </span>
                </div>
                <p className="text-base leading-relaxed text-gray-600  ">
                  Bazar is a modern app store platform where users can
                  discover, explore, and download the latest apps across
                  different categories. All in one clean, easy-to-use interface.
                </p>
                {/* Social Icons */}
                <ul className="flex items-center space-x-3 ">
                  {/* YouTube */}
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-white hover:bg-gray-200 rounded-full w-9 h-9     transition-all duration-200"
                    >
                      <img
                        src="https://i.ibb.co.com/0Rv7bW1Y/youtube.png"
                        alt="YouTube"
                        className="w-6 h-6 object-contain"
                      />
                    </a>
                  </li>

                  {/* WhatsApp */}
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-white hover:bg-gray-200 rounded-full w-9 h-9  transition-all duration-200"
                    >
                      <img
                        src="https://i.ibb.co.com/bRQ00X7r/whatsApp.png"
                        alt="WhatsApp"
                        className="w-6 h-6 object-contain"
                      />
                    </a>
                  </li>

                  {/* GitHub */}
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-white hover:bg-gray-200 rounded-full w-9 h-9 transition-all duration-200"
                    >
                      <img
                        src="https://i.ibb.co.com/ycV6JKZR/github.png"
                        alt="GitHub"
                        className="w-6 h-6 object-contain"
                      />
                    </a>
                  </li>

                  {/* LinkedIn */}
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-white hover:bg-gray-200 rounded-full w-9 h-9  transition-all duration-200"
                    >
                      <img
                        src="https://i.ibb.co.com/tpRg3Hpr/linkedin.png"
                        alt="LinkedIn"
                        className="w-6 h-6 object-contain"
                      />
                    </a>
                  </li>

                  {/* Messenger */}
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-white hover:bg-gray-200 rounded-full w-9 h-9  transition-all duration-200"
                    >
                      <img
                        src="https://i.ibb.co.com/bj0vfrG4/facebook-messenger-logo.png"
                        alt="Messenger"
                        className="w-6 h-6 object-contain"
                      />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                  Company
                </p>
                <ul className="mt-6 space-y-4">
                  {["About", "Features", "Works", "Career"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help */}
              <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                  Help
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Customer Support",
                    "Delivery Details",
                    "Terms & Conditions",
                    "Privacy Policy",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe */}
              <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                  Subscribe to newsletter
                </p>
                <form className="mt-6">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className="btn bg-[#00D390] font-semibold text-white my-4"
                  >
                    Uninstall
                  </button>
                </form>
              </div>
            </div>

            <hr className="mt-16 mb-10 border-gray-200" />

            <p className="text-sm text-center text-gray-600">
              © Copyright {date}, All Rights Reserved by{" "}
              <span className="text-yellow-500 font-bold">Bazar</span>
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Footer;
