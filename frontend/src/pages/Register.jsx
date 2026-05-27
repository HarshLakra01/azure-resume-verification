import { useState } from "react";
import API from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gray-900 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-2xl w-96 shadow-2xl"
      >

        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg mb-4 bg-gray-700 text-white"
        />

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
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;