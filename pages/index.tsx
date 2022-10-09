import type { NextPage } from "next";
import Link from "next/link";
import PhotoCard from "../components/PhotoCard";

const Home: NextPage = () => {
  return (
    <div>
      <div className={"flex flex-col mt-5"}>
        <div className={"flex flex-row justify-center"}>
          <h1 className={"text-4xl font-serif"}>Der Moda</h1>
        </div>
        <div
          className={"flex flex-row mx-12 mt-3.5 justify-between items-center"}
        >
          <div className={"flex flex-row"}>
            <Link href={"/"}>
              <a className={"text-xl px-5"}>Женщинам</a>
            </Link>
            <Link href={"/"}>
              <a className={"text-xl px-5"}>Мужчинам</a>
            </Link>
            <Link href={"/"}>
              <a className={"text-xl px-5"}>Детям</a>
            </Link>
          </div>
          <div className={"flex flex-row mr-5"}>
            <Link href={"/"}>
              <a className={"text-lg text-gray-600 px-5"}>Вход</a>
            </Link>
            <Link href={"/"}>
              <a className={"text-xl px-3"}>Корзина</a>
            </Link>
          </div>
        </div>
        <div className={"flex flex-row justify-center mt-10"}>
          <h1 className={"text-4xl text-center"}>Выберите раздел для вас</h1>
        </div>
        <div className={"flex flex-row justify-center mt-14"}>
          <PhotoCard
            image={"/photo_2022-10-09_21-47-08.jpg"}
            title={"Женское"}
            style={"mx-7"}
          />
          <PhotoCard
            image={"/photo_2022-09-14_14-18-03.jpg"}
            title={"Мужское"}
            style={"mx-7"}
          />
          <PhotoCard
            image={"/photo_2022-10-09_22-11-11.jpg"}
            title={"Детское"}
            style={"mx-7"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
