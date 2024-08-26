import User from "../Model/UserModel.js";
import asyncHandeler from "../Middelwear/async.js";
import bcrypt from "bcryptjs";
import genToken from "../Uttils/CreateToken.js";
const creatUser = asyncHandeler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs");
  }

  const userExist = await User.findOne({ email });
  if (userExist) res.status(400).send("User already Exist");

  const salt = await bcrypt.genSalt(5);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hash });

  try {
    await newUser.save();
    genToken(res, newUser._id);
    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

const loginuser = asyncHandeler(async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) {
    const ispass = await bcrypt.compare(password, exist.password);
    if (ispass) {
      genToken(res, exist._id);

      res.status(201).json({
        _id: exist._id,
        username: exist.username,
        email: exist.email,
        isAdmin: exist.isAdmin,
      });
    }
  }
});

const logoutuser = asyncHandeler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout" });
});

const getAll = asyncHandeler(async (req, res) => {
  const all = await User.find({});
  res.json(all);
});

const getCurrentPeofile = asyncHandeler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateCurrentProfile = asyncHandeler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(5);
      const hash = await bcrypt.hash(req.body.password, salt);
      user.password = hash;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleatUser = asyncHandeler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Connot deleat admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandeler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserbyId = asyncHandeler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  creatUser,
  loginuser,
  logoutuser,
  getAll,
  getCurrentPeofile,
  updateCurrentProfile,
  deleatUser,
  getUserById,
  updateUserbyId,
};
