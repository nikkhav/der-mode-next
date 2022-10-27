import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import axios from "axios";
import { Item, ItemDetailedProps } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectGender } from "../../../store/slices/currentUserSlice";
import { addToCart, addToCartQuantity } from "../../../store/slices/cartSlice";
import Head from "next/head";

const ItemDetailed: NextPage<ItemDetailedProps> = ({ item }) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [cartButtonClasses, setCartButtonClasses] = useState<string>(
    "sm:px-4 sm:py-2 sm:w-auto sm:h-auto w-52 h-12 mt-5 sm:mt-0 text-xl text-white rounded-md bg-black hover:bg-gray-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedGender = useAppSelector(
    (state) => state.currentUser.selectedGender
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const itemName: string = `${item.title} | ${item.brand}`;

  useEffect(() => {
    if (router.query.gender !== selectedGender) {
      dispatch(selectGender(router.query.gender as string));
    }
    if (item.sizes.length === 1) setSelectedSize(item.sizes[0]);
  }, [selectedGender, dispatch, router.query, item.sizes]);

  const handleAddToCart = (item: Item) => (event: any) => {
    event.preventDefault();
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item._id);
    if (itemInCart && itemInCart.size === selectedSize) {
      dispatch(addToCartQuantity(item._id));
      setCartButtonClasses(
        "sm:px-4 sm:py-2 sm:w-auto sm:h-auto w-52 h-12 mt-5 sm:mt-0 text-xl text-white rounded-md bg-black hover:bg-gray-700 transition duration-300 ease-in-out animate-ping"
      );
      setTimeout(() => {
        setCartButtonClasses(
          "sm:px-4 sm:py-2 sm:w-auto sm:h-auto w-52 h-12 mt-5 sm:mt-0 text-xl text-white rounded-md bg-black hover:bg-gray-700 transition duration-300 ease-in-out"
        );
      }, 1000);
    } else {
      dispatch(
        addToCart({
          id: item._id,
          image: item.images[0],
          title: item.title,
          price: item.price,
          quantity: 1,
          brand: item.brand,
          size: selectedSize,
          gender: item.gender,
          category: item.category,
        })
      );
      setCartButtonClasses(
        "sm:px-4 sm:py-2 sm:w-auto sm:h-auto w-52 h-12 mt-5 sm:mt-0 text-xl text-white rounded-md bg-black hover:bg-gray-700 transition duration-300 ease-in-out animate-ping"
      );
      setTimeout(() => {
        setCartButtonClasses(
          "sm:px-4 sm:py-2 sm:w-auto sm:h-auto w-52 h-12 mt-5 sm:mt-0 text-xl text-white rounded-md bg-black hover:bg-gray-700 transition duration-300 ease-in-out"
        );
      }, 1000);
    }
  };

  return (
    <>
      <Head>
        <title>{itemName}</title>
      </Head>
      <div className={"flex sm:flex-row flex-col sm:p-10 mt-5 sm:mt-0 p-3"}>
        <div className={"sm:w-8/12 w-11/12 mx-auto"}>
          <div className={"flex flex-row sm:justify-center justify-between"}>
            {item.images.map((image, index) => {
              return (
                <div
                  key={index}
                  className={"w-full flex flex-row sm:justify-center mx-2"}
                >
                  <Image
                    src={image}
                    alt={item.title}
                    width={400}
                    height={500}
                    className={"mx-2"}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={
            "flex flex-col items-center justify-evenly mt-5 sm:mt-0 mx-auto w-4/12"
          }
        >
          <div className={"flex flex-col items-center"}>
            {item.new ? (
              <h2
                className={"text-xl text-center text-red-600 font-light mb-4"}
              >
                Новинка
              </h2>
            ) : (
              ""
            )}
            <h2 className={"text-3xl text-center font-intertight"}>
              {item.title}
            </h2>
            <h3 className={"text-2xl text-center mt-3 font-raleway"}>
              {item.brand}
            </h3>
            <h3 className={"text-xl text-center font-raleway mt-5"}>
              Цена: {item.price} ₽
            </h3>
            <h3 className={"text-xl text-center font-raleway mt-5"}>
              Размеры:
            </h3>
            <div className={"flex flex-row justify-center mt-5"}>
              {item.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md mx-2 ${
                    size === selectedSize ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart(item)}
            className={cartButtonClasses}
            disabled={selectedSize === ""}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.HOST}/api/items`);
  const data = await res.json();

  const categories = ["all", "new", "clothes", "shoes", "accessories"];
  const paths: any = [];

  for (let i = 0; i < categories.length; i++) {
    data.items.map((item: Item) => {
      paths.push({
        params: {
          itemId: item._id.toString(),
          gender: item.gender.toString(),
          category: categories[i],
        },
      });
    });
  }

  return {
    paths,
    fallback: true,
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
