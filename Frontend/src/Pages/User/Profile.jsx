import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../Component/Loader";
import { setCredientials } from "../../Redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../Redux/api/userApislice";
const Profile = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateprofile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setusername(userInfo.username);
    setemail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandeler = async (e) => {
    e.preventDefault();
    if (password !== confirmpass) {
      toast.error("Password won't match");
    } else {
      try {
        const res = await updateprofile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("Profile Update successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2x font-semibold md-4">Update Profile</h2>

          <form onSubmit={submitHandeler}>
            <div className="md-4">
              <label className="block text-white md-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="from-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="md-4">
              <label className="block text-white md-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="from-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="md-4">
              <label className="block text-white md-2">Password</label>
              <input
                type="password"
                placeholder="Enter passsword"
                className="from-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="md-4">
              <label className="block text-white md-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Confirm Password"
                className="from-input p-4 rounded-sm w-full"
                value={confirmpass}
                onChange={(e) => setconfirmpassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-3 px-4 rounded hover:bg-pink-700"
              >
                My Order
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
