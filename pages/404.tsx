import React from "react";
import { VscError } from "react-icons/vsc";
import Link from "next/link";

const FourOhFour = () => {
  return (
    <div className={"flex flex-col justify-center items-center mx-auto mt-32"}>
      <h1 className={"text-5xl text-center font-light"}>Страница не найдена</h1>
      <VscError className={"mt-5 text-red-700"} size={60} />
      <h3 className={"text-2xl text-center font-light mt-5"}>Ошибка 404</h3>
      <h3 className={"text-3xl text-center font-light mt-5"}>
        Попробуйте вернуться назад или перейдите на главную страницу
      </h3>
      <Link href={"/"}>
        <a
          className={
            "text-2xl mt-10 font-raleway rounded-2xl border-2 border-black py-3 mb-20 px-5"
          }
        >
          На главную
        </a>
      </Link>
    </div>
  );
};

export default FourOhFour;
