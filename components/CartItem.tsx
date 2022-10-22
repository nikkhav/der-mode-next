import React from "react";
import { CartItemProps } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppDispatch } from "../store/hooks";
import { reduceFromCartQuantity } from "../store/slices/cartSlice";

const CartItem: NextPage<CartItemProps> = ({
  id,
  price,
  path,
  image,
  title,
  quantity,
  brand,
  size,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div
      className={
        "flex flex-row w-full mt-4 p-6 border-y-2 justify-between items-center"
      }
    >
      <div className={"flex flex-row w-7/12 items-center justify-evenly"}>
        <div>
          <Image
            onClick={() => router.push(path)}
            src={image}
            alt={title}
            width={180}
            height={200}
            className={
              "cursor-pointer rounded-md hover:opacity-80 transition-opacity"
            }
          />
        </div>
        <div className={"w-3/12"}>
          <h1 className={"text-3xl font-raleway mb-2"}>
            {title} {brand}
          </h1>
          <h2 className={"text-xl font-thin"}>Размер: {size.toUpperCase()}</h2>
          <h2 className={"text-2xl font-thin"}>Цена: {price} ₽</h2>
        </div>
        <div>
          <h2 className={"text-xl font-light mb-1"}>Количество: {quantity}</h2>
          <h2 className={"text-xl font-light"}>Сумма: {price * quantity} ₽</h2>
        </div>
      </div>
      <div className={"flex w-3/12 items-center justify-center"}>
        <button
          onClick={() => dispatch(reduceFromCartQuantity(id))}
          className={
            "border-2 border-gray-200 text-lg px-4 py-2 rounded-xl hover:bg-red-700 hover:text-white hover:border-0 transition-colors"
          }
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem;
