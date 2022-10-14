import type { NextApiRequest, NextApiResponse } from "next";
import Item from "../../../mongodb/models/itemModel";
import connectDB from "../../../mongodb/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method === "GET") {
    try {
      const items = await Item.find({ gender: req.query.itemGender });
      return res.status(200).json({
        status: "success",
        items,
      });
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
