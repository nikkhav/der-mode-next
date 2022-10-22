import React from "react";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectGender } from "../store/slices/currentUserSlice";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentGender = useAppSelector(
    (state) => state.currentUser.selectedGender
  );
  const cartAmount = useAppSelector((state) => state.cart.amount);

  return (
    <div className={"mt-5"}>
      <div className={"flex flex-row justify-center"}>
        <h1
          className={
            "text-4xl logo_title hover:cursor-pointer animate-slide-right"
          }
          onClick={() => router.push("/")}
        >
          Der Mode
        </h1>
      </div>
      <div
        className={"flex flex-row mx-12 mt-3.5 justify-between items-center"}
      >
        <div className={"flex flex-row"}>
          <h2
            className={`text-xl ${
              currentGender === "women"
                ? "border-b-2 border-[#00A550] hover:border-lime-700"
                : "text-gray-500"
            } mx-5 font-raleway transition ease-in-out duration-300 hover:text-gray-600 hover:cursor-pointer`}
            onClick={() => {
              if (router.pathname !== "/") {
                router.push("/women/all");
              }
              dispatch(selectGender("women"));
            }}
          >
            Женщинам
          </h2>
          <h2
            className={`text-xl ${
              currentGender === "men"
                ? "border-b-2 border-[#00A550] hover:border-lime-700"
                : "text-gray-500"
            } mx-5 font-raleway transition ease-in-out duration-300 hover:text-gray-800 hover:cursor-pointer`}
            onClick={() => {
              if (router.pathname !== "/") {
                router.push("/men/all");
              }
              dispatch(selectGender("men"));
            }}
          >
            Мужчинам
          </h2>

          <h2
            className={`text-xl ${
              currentGender === "kids"
                ? "border-b-2 border-[#00A550] hover:border-lime-700"
                : "text-gray-500"
            } mx-5 font-raleway transition ease-in-out duration-300 hover:text-gray-800 hover:cursor-pointer`}
            onClick={() => {
              if (router.pathname !== "/") {
                router.push("/kids/all");
              }
              dispatch(selectGender("kids"));
            }}
          >
            Детям
          </h2>
        </div>
        <div className={"flex flex-row items-center mr-5"}>
          <Link href={"/"}>
            <a className={"text-xl text-gray-600 px-7"}>Вход</a>
          </Link>
          <BsCart2 className={"text-xl mb-1"} />
          <Link href={"/cart"}>
            <a
              className={
                "text-xl px-3 font-raleway transition ease-in-out duration-300 hover:text-gray-600"
              }
            >
              Корзина
            </a>
          </Link>
          <p className={"text-xl px-1 font-light"}>{cartAmount}</p>
        </div>
      </div>
      <div
        className={
          "flex flex-row justify-center border-y-2 bg-gray-200 mt-5 p-2"
        }
      >
        <Link href={`/${currentGender}/new`}>
          <a
            className={
              "text-lg text-red-700 px-5 font-raleway transition ease-in-out duration-300 hover:text-red-900 animate-pulse"
            }
          >
            Новинки
          </a>
        </Link>
        <Link href={`/${currentGender}/clothes`}>
          <a
            className={
              "text-lg px-5 font-raleway transition ease-in-out duration-300 hover:text-gray-600"
            }
          >
            Одежда
          </a>
        </Link>
        <Link href={`/${currentGender}/shoes`}>
          <a
            className={
              "text-lg px-5 font-raleway transition ease-in-out duration-300 hover:text-gray-600"
            }
          >
            Обувь
          </a>
        </Link>
        <Link href={`/${currentGender}/accessories`}>
          <a
            className={
              "text-lg px-5 font-raleway transition ease-in-out duration-300 hover:text-gray-600"
            }
          >
            Аксессуары
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
