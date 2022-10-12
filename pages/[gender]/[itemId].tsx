import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const ItemDetailed = () => {
  const router = useRouter();
  const id: string = router.query.itemId as string;
  return (
    <div className={"flex flex-row p-10"}>
      <div className={"w-8/12"}>
        <div className={"flex flex-row justify-center"}>
          <div className={"w-full"}>
            <Image
              src={"/images/test-image-3.jpg"}
              alt={"title"}
              width={400}
              height={500}
              className={"mx-2"}
            />
          </div>
          <div className={"w-full"}>
            <Image
              src={"/images/test-image-2.jpg"}
              alt={"title"}
              width={400}
              height={500}
              className={"mx-2"}
            />
          </div>
        </div>
      </div>
      <div className={"flex flex-col items-center justify-evenly w-4/12"}>
        <div className={"flex flex-col items-center"}>
          <h2 className={"text-3xl font-intertight"}>Крутой худак</h2>
          <h3 className={"text-2xl mt-3 font-raleway"}>Худи</h3>
          <h3 className={"text-xl font-raleway mt-5"}>Цена: 1000 ₽</h3>
          <h3 className={"text-xl font-raleway mt-5"}>Размеры:</h3>
          <div className={"flex flex-row justify-center mt-5"}>
            <button className={"w-10 h-10 rounded-md bg-gray-100 mx-2"}>
              S
            </button>
            <button className={"w-10 h-10 rounded-md bg-gray-100 mx-2"}>
              M
            </button>
            <button className={"w-10 h-10 rounded-md bg-gray-100 mx-2"}>
              L
            </button>
            <button className={"w-10 h-10 rounded-md bg-gray-100 mx-2"}>
              XL
            </button>
          </div>
        </div>
        <button className={"px-4 py-2 text-xl text-white rounded-md bg-black"}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ItemDetailed;
