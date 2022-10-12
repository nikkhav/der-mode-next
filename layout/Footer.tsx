import React from "react";
import { SiVisa, SiPaypal, SiApplepay } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={"flex flex-col bg-black mt-10 p-10"}>
      <div className={"flex flex-row justify-center"}>
        <h3 className={"text-white text-2xl font-raleway"}>
          Скидка 10% за отзыв в Яндекс Картах
        </h3>
      </div>
      <div className={"flex flex-row justify-center"}>
        <h3 className={"text-white text-xl font-raleway"}>
          Покажите отзыв в магазине для получения скидки
        </h3>
      </div>
      <div className={"flex flex-col justify-center mt-8"}>
        <div className={"flex flex-row justify-center"}>
          <h1 className={"text-white text-2xl font-raleway"}>Способы оплаты</h1>
        </div>
        <div className={"flex flex-row justify-center"}>
          <SiVisa className={"text-blue-500 mx-2"} size={40} />
          <FaCcMastercard className={"text-orange-600 mx-2"} size={40} />
          <SiPaypal className={"text-blue-700 mx-2"} size={40} />
          <SiApplepay className={"text-white mx-2"} size={40} />
        </div>
      </div>
      <div className={"flex flex-row justify-center mt-8"}>
        <h3 className={"text-white text-xl font-raleway"}>Приятных покупок!</h3>
      </div>
      <div className={"flex flex-row justify-center mt-8"}>
        <h3 className={"text-white text-xl font-raleway"}>
          © 2022 Der Mode. Все права защищены.
        </h3>
      </div>
    </div>
  );
};

export default Footer;
