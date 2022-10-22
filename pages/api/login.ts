import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../mongodb/models/userModel";
const bcrypt = require("bcrypt");
import connectDB from "../../mongodb/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Find the user in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(200).json({
          status: "error",
          message: `User with email - ${email} does not exist`,
        });
      }

      // Check if the password is correct
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(200).json({
          status: "error",
          message: "Invalid password",
        });
      }

      // If the user exists and the password is correct, return the user
      return res.status(200).json({
        status: "success",
        message: "User has been successfully logged in",
        userData: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ status: "error", message: error.message });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }
}
