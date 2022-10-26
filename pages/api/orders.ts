import type { NextApiRequest, NextApiResponse } from "next";
import Order from "../../mongodb/models/orderModel";
import connectDB from "../../mongodb/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method === "POST") {
    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json({
        status: "success",
        newOrder,
        message: "Order created successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ status: "error", message: error.message });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }
  if (req.method === "GET") {
    try {
      const orders = await Order.find();
      if (!orders || orders.length === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "No orders found" });
      }
      return res.status(202).json({
        status: "success",
        orders,
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
