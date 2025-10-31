import { Link } from "react-router-dom";
import api from "../axios/api";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // const handleChange = (e) => {
  //   setValues({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("user/signup", values);
      console.log("Signup successful:", response);

      if (response.data.success) {
        toast.success("Signup Successful! Please login.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
        // navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 border-8 border-emerald-600 rounded-tl-[700px] ">
      <div className="p-6 bg-white rounded-2xl shadow-lg w-80 border border-emerald-200">
        <h2 className="text-center text-lg font-semibold text-emerald-900 mb-4">
          Create Account 🍀
        </h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          className="w-full bg-emerald-50 rounded-md pl-3 py-2 border border-emerald-300
                 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white
                 transition-all duration-200
                 mb-2.5
                 "
        />
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
          Submit
        </button>
        <Link to={"/"}>
          <p className="mt-[15px] text-center text-[13px] font-bold hover:cursor-pointer">
            Already have an account?
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
