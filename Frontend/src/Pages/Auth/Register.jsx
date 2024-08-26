import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Component/Loader";
import { setCredientials } from "../../Redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../Redux/api/userApislice";
const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confermpass, setconfirmpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password != confermpass) {
      toast.error("password won't match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        toast.success("User successfully Register");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  return (
    <>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold md-4">Register</h1>
          <form onSubmit={handelSubmit} className="container w-[40rem]">
            <div className="md-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="md-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="md-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confermpass"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter confirm password"
                value={confermpass}
                onChange={(e) => setconfirmpassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-4">
            <p className="text-white">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://unsplash.com/photos/green-purple-blue-and-yellow-abstract-art-ZpC7sJVovLM"
            alt=""
            className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
          />
        </div>
      </section>
    </>
  );
};

export default Register;
