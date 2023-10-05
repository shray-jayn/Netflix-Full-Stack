const User = require("../models/User");

const CryptoJS = require("crypto-js");

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (req.user.id === id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY_FOR_CRYPTOJS
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body, // will replace the whole document with the new one except the id
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: "You can update only your account!",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (req.user.id === id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "User has been deleted successfully!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: "You can delete only your account!",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
  // to get the query string from the url we use req.query
  const query = req.query.new;

  if (req.user.isAdmin === true) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json("You are not allowed to see all users! " + err);
    }
  }
};

const getUserStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    // here we are using mongodb aggregation to get the months and
    // the total number of users registered in each month
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }, // $month is a mongodb operator
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }, // $sum is a mongodb operator
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { updateUser, deleteUser, getUser, getAllUsers, getUserStats };
