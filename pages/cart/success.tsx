import React, { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { useAppSelector } from "../../store/hooks";
import Head from "next/head";

const Success = () => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.currentUser);
  useEffect(() => {
    if (!currentUser.id) {
      router.push("/");
    } else {
      setTimeout(() => {
        router.push("/");
      }, 10000);
    }
  }, [router, currentUser]);
  return (
    <>
      <Head>
        <title>Спасибо за покупку!</title>
      </Head>
      <div className={"flex flex-col justify-center items-center mt-20 mb-16"}>
        <AiOutlineCheckCircle className={"text-6xl text-green-500 mx-auto"} />
        <p className={"text-4xl font-light text-center p-3"}>
          Спасибо за покупку!
        </p>
        <p className={"text-2xl font-light text-gray-500 text-center mt-3.5"}>
          Вы будете перенаправлены на главную страницу через 10 секунд
        </p>
      </div>
    </>
  );
};

export default Success;
