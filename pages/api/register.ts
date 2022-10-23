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
      const { name, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(201).json({
          status: "error",
          message: "This user already exists",
        });
      }

      if (password.length < 6) {
        return res.status(202).json({
          status: "error",
          message: "Password must be at least 6 characters",
        });
      }

      if (!name || !email || !password) {
        return res.status(203).json({
          status: "error",
          message: "All fields are required",
        });
      }
      // If the user does not exist, create a new user
      // Hash the password
      const hashPassword = bcrypt.hashSync(password, 8);

      // Create a new user
      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
      });

      res.status(200).json({
        status: "success",
        message: "User has been successfully created",
        userData: {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          id: newUser._id,
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
