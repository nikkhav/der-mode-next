import React from "react";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className={"mt-5"}>
      <div className={"flex flex-row justify-center"}>
        <h1
          className={"text-4xl logo_title hover:cursor-pointer"}
          onClick={() => router.push("/")}
        >
          Der Mode
        </h1>
      </div>
      <div
        className={"flex flex-row mx-12 mt-3.5 justify-between items-center"}
      >
        <div className={"flex flex-row"}>
          <Link href={"/women"}>
            <a
              className={
                "text-xl px-5 font-raleway transition ease-in-out duration-300 hover:text-gray-600"
              }
            >
              Женщинам
            </a>
          </Link>
          <Link href={"/men"}>
            <a
              className={
                "text-xl text-gray-600 px-5 font-raleway transition ease-in-out duration-300 hover:text-gray-800"
              }
            >
              Мужчинам
            </a>
          </Link>
          <Link href={"/kids"}>
            <a
              className={
                "text-xl text-gray-600 px-5 font-raleway transition ease-in-out duration-300 hover:text-gray-800"
              }
            >
              Детям
            </a>
          </Link>
        </div>
        <div className={"flex flex-row items-center mr-5"}>
          <Link href={"/"}>
            <a className={"text-xl text-gray-600 px-7"}>Вход</a>
          </Link>
          <BsCart2 className={"text-xl mb-1"} />
          <Link href={"/"}>
            <a
              className={
                "text-xl px-3 font-raleway transition ease-in-out duration-300 hover:text-gray-600"
              }
            >
              Корзина
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
