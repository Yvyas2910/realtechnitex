import userModel from "../models/userModel.js";

// get all user details
export const getUserControllers = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "User's details fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Couldn't get user details",
    });
  }
};
