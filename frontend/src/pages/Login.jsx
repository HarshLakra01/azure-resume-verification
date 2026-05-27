import { useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      // Save Token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      console.log(response.data);

      // Redirect after login
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gray-900 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-2xl w-96 shadow-2xl"
      >

        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg mb-4 bg-gray-700 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg mb-6 bg-gray-700 text-white"
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;