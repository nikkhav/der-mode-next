import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../mongodb/database";
import User from "../../mongodb/models/userModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method === "GET") {
    try {
      const user = await User.findById(req.query.id);
      if (!user) {
        return res
          .status(205)
          .json({ status: "error", message: "User not found" });
      }
      return res.status(202).json({ status: "success", user });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(400)
          .json({ status: "error", message: error.message });
      } else {
        return res
          .status(400)
          .json({ status: "error", message: "Something went wrong" });
      }
    }
  }
}
