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
      const items = await Item.find();
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
  if (req.method === "POST") {
    try {
      const newItem = await Item.create(req.body);
      res.status(201).json({
        status: "success",
        newItem,
        message: "Item created successfully",
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
