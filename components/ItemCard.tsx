import React from "react";
import Image from "next/image";
import { NextPage } from "next";
import { ItemCardProps } from "../types";
import { useRouter } from "next/router";

const ItemCard: NextPage<ItemCardProps> = ({
  title,
  price,
  image,
  brand,
  path,
}) => {
  const router = useRouter();
  return (
    <div
      className={
        "flex flex-col justify-center w-1/5 h-full mx-5 my-8 pt-2 rounded-md"
      }
    >
      <div className={"w-full h-full"}>
        <Image
          src={image}
          alt={title}
          width={300}
          height={400}
          layout={"responsive"}
          placeholder={"blur"}
          blurDataURL={image}
          className={
            "rounded-md hover:opacity-80 transition-opacity duration-300"
          }
          onClick={() => router.push(path)}
        />
      </div>
      <div className={"flex flex-col justify-start w-11/12 p-2"}>
        <h1 className={"text-lg font-intertight mt-2"}>{price} ₽</h1>
        <h1 className={"text-lg font-intertight pt-2"}>{brand}</h1>
        <h1 className={"text-xl font-light"}>{title}</h1>
      </div>
    </div>
  );
};

export default ItemCard;
