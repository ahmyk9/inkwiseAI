import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp, googleLogin } from "../firebase/auth"; // Combine imports from the same file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/Footer";

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function handleSignUp(event) {
    event.preventDefault(); // Prevent the default form submission
    try {
      const userCredential = await signUp(email, password);
      setUser(userCredential.user);
      navigate("/whiteboard"); // Navigate after signup
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function handleGoogleLogin() {
    try {
      const userCredential = await googleLogin();
      setUser(userCredential);
      navigate("/whiteboard");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-6 ">
      <div className="bg-white max-w-lg w-full p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Create an Account
        </h1>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <label className="text-lg font-medium">Full Name</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter Your Name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter Your Email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-medium">Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter Your Password"
              autoComplete="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="p-5 flex flex-col gap-y-4">
            <button
              className="hover:bg-blue-600 transition flex items-center justify-center space-x-3 border p-3 px-6 rounded-md text-white bg-black cursor-pointer"
              type="submit"
            >
              <p>Create Account</p>
            </button>
            <button
              className="flex py-3 border border-gray-100 rounded-md hover:bg-blue-600 hover:text-white transition items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              type="button" // Change to button to avoid form submission
            >
              <FontAwesomeIcon icon={faGoogle} />
              <span>Sign Up with Google</span>
            </button>
          </div>
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <span className="underline text-blue-500">
              <Link to="/login">Login Here</Link>
            </span>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
