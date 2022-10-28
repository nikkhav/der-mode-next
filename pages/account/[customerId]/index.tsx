import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { NextPage } from "next";
import { ProfileProps } from "../../../types";
import { useAppSelector } from "../../../store/hooks";
import Image from "next/image";

const CustomerProfile: NextPage<ProfileProps> = ({ user, orders }) => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const router = useRouter();
  useEffect(() => {
    if (!currentUser.isLogged) {
      router.push("/");
    }
  }, [currentUser, router]);
  return (
    <div className={"p-5 mt-5"}>
      <h1 className={"text-3xl text-center font-raleway"}>
        Здравствуйте, {user.name}
      </h1>
      <div className={"flex flex-col mt-5 justify-center items-center"}>
        <h3 className={"text-3xl font-raleway"}>Ваши заказы</h3>
        {user.orders.length === 0 ? (
          <h1 className={"text-2xl font-raleway mt-5"}>
            У вас пока нет заказов
          </h1>
        ) : (
          <div className={"flex flex-col-reverse sm:w-7/12 mt-5"}>
            {orders.map((order) => {
              return (
                <div
                  key={order._id}
                  className={
                    "flex flex-row justify-between border-y-2 border-y-gray-200 p-2 mt-5 mb-3 transition-shadow hover:shadow-md hover:cursor-pointer"
                  }
                  onClick={() =>
                    router.push(`/account/${user._id}/${order._id}`)
                  }
                >
                  <div
                    className={"flex flex-col justify-center w-5/12 sm:w-auto"}
                  >
                    <Image
                      src={order.items[0].image}
                      width={200}
                      height={200}
                      alt={order.items[0].title}
                      className={"rounded-lg"}
                    />
                  </div>
                  <div className={"flex flex-col justify-center"}>
                    <h1 className={"sm:text-3xl text-2xl font-raleway"}>
                      {order.date}
                    </h1>
                    <h2 className={"sm:text-3xl text-2xl font-raleway"}>
                      {order.items.length} товаров
                    </h2>
                    <h2 className={"sm:text-3xl text-2xl font-raleway"}>
                      {order.totalSum} рублей
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { customerId } = context.query;
  const res = await axios.get(
    `${process.env.HOST}/api/profile?id=${customerId}`
  );
  const data = await res.data;
  const user = data.user;
  const ordersRes = await axios.get(
    `${process.env.HOST}/api/orders/?userId=${user._id}`
  );
  const orders = await ordersRes.data.orders;
  return {
    props: {
      user,
      orders,
    },
  };
}

export default CustomerProfile;
