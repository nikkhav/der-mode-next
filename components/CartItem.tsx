import React from "react";
import { CartItemProps } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppDispatch } from "../store/hooks";
import {
  reduceFromCartQuantity,
  removeFromCart,
} from "../store/slices/cartSlice";

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

  const handleReduceQuantity = (id: string) => (event: any) => {
    event.preventDefault();
    dispatch(reduceFromCartQuantity(id));
  };

  const handleRemoveFromCart = (id: string) => (event: any) => {
    event.preventDefault();
    dispatch(removeFromCart(id));
  };
  return (
    <div
      className={
        "flex sm:flex-row flex-col w-full mt-4 sm:p-6 p-3 border-y-2 justify-between items-center"
      }
    >
      <div className={"flex sm:flex-row sm:w-7/12 items-center justify-evenly"}>
        <div className={"w-5/12 mt-5 sm:mt-0 sm:w-auto"}>
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
        <div className={"sm:w-3/12 ml-5 sm:ml-0"}>
          <h1 className={"sm:text-3xl text-2xl font-raleway mb-2"}>
            {title} {brand}
          </h1>
          <h2 className={"sm:text-xl font-thin"}>
            Размер: {size.toUpperCase()}
          </h2>
          <h2 className={"sm:text-2xl font-thin"}>Цена: {price} ₽</h2>
          <h2
            className={"sm:text-xl font-thin visible sm:hidden font-light mb-1"}
          >
            Количество: {quantity}
          </h2>
        </div>
        <div className={"hidden sm:visible"}>
          <h2 className={"sm:text-xl font-light mb-1"}>
            Количество: {quantity}
          </h2>
          <h2 className={"sm:text-xl font-light"}>
            Сумма: {price * quantity} ₽
          </h2>
        </div>
      </div>
      <div className={"flex w-3/12 items-center justify-center"}>
        <button
          onClick={
            quantity > 1 ? handleReduceQuantity(id) : handleRemoveFromCart(id)
          }
          className={
            "border-2 border-gray-200 text-lg my-5 sm:my-0 px-4 py-2 rounded-xl hover:bg-red-700 hover:text-white hover:border-0 transition-colors"
          }
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem;
