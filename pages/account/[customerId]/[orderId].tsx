import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { NextPage } from "next";
import { OrderDetailedProps } from "../../../types";
import Image from "next/image";

const OrderDetailed: NextPage<OrderDetailedProps> = ({ order }) => {
  const router = useRouter();
  return (
    <div className={"flex flex-col justify-center mt-5"}>
      <h1 className={"text-3xl text-center font-light"}>
        Заказ от {order.date}
      </h1>
      <h2 className={"text-3xl text-center font-light"}>
        {order.items.length} товаров
      </h2>
      <h2 className={"text-3xl text-center font-light"}>
        {order.totalSum} рублей
      </h2>
      {order.items.map((item) => {
        return (
          <div
            key={item.id}
            className={
              "flex flex-row sm:w-6/12 border-2 mx-auto justify-between rounded-xl mt-5 p-3"
            }
          >
            <div className={"flex flex-col justify-center w-5/12 sm:w-auto"}>
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className={"rounded-xl hover:cursor-pointer"}
                onClick={() => router.push(`/${item.gender}/all/${item.id}`)}
              />
            </div>
            <div className={"flex flex-col justify-center"}>
              <h1 className={"text-3xl text-center font-light"}>
                {item.title} x{item.quantity}
              </h1>
              <h2 className={"text-3xl text-center font-light"}>
                Размер: {item.size.toUpperCase()}
              </h2>
              <h2 className={"text-3xl mt-4 text-center font-light"}>
                {item.price} рублей
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { orderId } = context.query;
  const res = await axios.get(`${process.env.HOST}/api/orders/${orderId}`);
  const order = res.data.order;

  return {
    props: {
      order,
    },
  };
}

export default OrderDetailed;
