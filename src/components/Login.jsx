import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/api";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("Login submitted with values:", values);
      // Handle login submission
      const response = await api.post("user/login", values);
      console.log("Login response:", response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful! Redirecting...");
        setTimeout(() => {
          navigate("/main");
        }, 500);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 border-8 border-emerald-600 rounded-tl-[700px] ">
      <div className="p-6 bg-white rounded-2xl shadow-lg w-80 border border-emerald-200">
        <h2 className="text-center text-lg font-semibold text-emerald-900 mb-4">
          Welcome Back 🌿
        </h2>

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="w-full bg-emerald-50 rounded-md pl-3 py-2 border border-emerald-300
                 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white
                 transition-all duration-200
                 mb-2.5
                 "
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="w-full bg-emerald-50 rounded-md pl-3 py-2 border border-emerald-300
                 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white
                 transition-all duration-200"
        />

        <button
          className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700
                 text-white font-medium py-2 rounded-md
                 shadow-sm transition-all duration-200
                 hover: cursor-pointer
                 "
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className="mt-[15px] text-center text-[13px]  font-bold">
          Don't have an account?
        </p>
        <Link to={"/signup"}>
          <p className=" text-center text-[12px] underline text-blue-700 font-bold hover:cursor-pointer hover:text-blue-600">
            Create one now.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
