import type { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../mongodb/models/orderModel";
import connectDB from "../../../mongodb/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query;
  await connectDB();
  if (req.method === "GET") {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(201)
          .json({ status: "error", message: "No order found", order: null });
      }
      return res.status(200).json({ status: "success", order });
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
