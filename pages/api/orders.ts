import type { NextApiRequest, NextApiResponse } from "next";
import Order from "../../mongodb/models/orderModel";
import connectDB from "../../mongodb/database";
import User from "../../mongodb/models/userModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method === "POST") {
    try {
      const user = await User.findById(req.query.userId);
      const newOrder = req.body;
      if (!user) {
        return res
          .status(205)
          .json({ status: "error", message: "User not found" });
      }
      const order = await Order.create(newOrder);
      user.orders.push(order._id);
      await user.save();
      res.status(201).json({
        status: "success",
        order,
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
      const { userId } = req.query;
      const orders = await Order.find({ userId: userId });
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
