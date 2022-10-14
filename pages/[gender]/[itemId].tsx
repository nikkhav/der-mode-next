import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import axios from "axios";
import { Item, ItemDetailedProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectGender } from "../../store/slices/currentUserSlice";

const ItemDetailed: NextPage<ItemDetailedProps> = ({ item }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedGender = useAppSelector(
    (state) => state.currentUser.selectedGender
  );

  useEffect(() => {
    if (router.query.gender !== selectedGender) {
      dispatch(selectGender(router.query.gender as string));
    }
  }, [selectedGender]);

  return (
    <div className={"flex flex-row p-10"}>
      <div className={"w-8/12"}>
        <div className={"flex flex-row justify-center"}>
          <div className={"w-full"}>
            <Image
              src={item.image}
              alt={"title"}
              width={400}
              height={500}
              className={"mx-2"}
            />
          </div>
          <div className={"w-full"}>
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={500}
              className={"mx-2"}
            />
          </div>
        </div>
      </div>
      <div className={"flex flex-col items-center justify-evenly w-4/12"}>
        <div className={"flex flex-col items-center"}>
          <h2 className={"text-3xl font-intertight"}>{item.title}</h2>
          <h3 className={"text-2xl mt-3 font-raleway"}>{item.brand}</h3>
          <h3 className={"text-xl font-raleway mt-5"}>Цена: {item.price} ₽</h3>
          <h3 className={"text-xl font-raleway mt-5"}>Размеры:</h3>
          <div className={"flex flex-row justify-center mt-5"}>
            {item.sizes.map((size, index) => (
              <button
                key={index}
                className={"w-10 h-10 rounded-md bg-gray-100 mx-2"}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button className={"px-4 py-2 text-xl text-white rounded-md bg-black"}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/items");
  const data = await res.json();

  const paths = data.items.map((item: Item) => {
    return {
      params: {
        itemId: item._id.toString(),
        gender: item.gender.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const itemId = context.params?.itemId;
  const res = await axios.get(`${process.env.HOST}/api/item/${itemId}`);
  const item = res.data.item;

  return {
    props: {
      item,
    },
  };
};

export default ItemDetailed;
