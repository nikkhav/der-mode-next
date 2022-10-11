import React from "react";
import Image from "next/image";
import { NextPage } from "next";
import { ItemCardProps } from "../types";

const ItemCard: NextPage<ItemCardProps> = ({ title, price, image }) => {
  return (
    // TODO: Настроить Next Image
    <div
      className={
        "flex flex-col justify-center items-center w-1/5 h-96 mx-5 my-5 rounded-md"
      }
    >
      {/*<Image*/}
      {/*  src={image}*/}
      {/*  alt={title}*/}
      {/*  height={"100%"}*/}
      {/*  width={"100%"}*/}
      {/*  layout={"responsive"}*/}
      {/*  className={"rounded-t-md"}*/}
      {/*/>*/}
      <img
        src={image}
        alt={title}
        width={"200px"}
        height={"200px"}
        className={"rounded-t-md"}
      />
      <h1 className={"text-xl font-light"}>{title}</h1>
      <h1 className={"text-xl font-light"}>{price} руб.</h1>
    </div>
  );
};

export default ItemCard;
