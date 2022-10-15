import type { NextPage } from "next";
import { SiNike, SiJordan, SiNewbalance, SiThenorthface } from "react-icons/si";
import PhotoCard from "../components/PhotoCard";

const Home: NextPage = () => {
  return (
    <div>
      <div className={"flex flex-col"}>
        <div className={"flex flex-row justify-center mt-12"}>
          <h1
            className={"text-4xl text-center font-raleway animate-slide-left"}
          >
            Выберите раздел для вас
          </h1>
        </div>
        <div className={"flex flex-row justify-center mt-14"}>
          <PhotoCard
            image={"/images/women.jpg"}
            title={"Женское"}
            path={"women/all"}
          />
          <PhotoCard
            image={"/images/men.jpg"}
            title={"Мужское"}
            path={"men/all"}
          />
          <PhotoCard
            image={"/images/kids.jpeg"}
            title={"Детское"}
            path={"kids/all"}
          />
        </div>
        <div className={"flex flex-col justify-center"}>
          <div className={"flex flex-row justify-center mt-24"}>
            <h1 className={"text-4xl text-center font-raleway"}>
              Самые популярные бренды по низким ценам
            </h1>
          </div>
          <div
            className={"flex flex-row justify-center border-b-2 mt-10 pb-10"}
          >
            <SiNike className={"text-center mx-10"} size={100} />
            <SiNewbalance className={"text-center mx-10"} size={100} />
            <SiThenorthface className={"text-center mx-10"} size={100} />
            <SiJordan className={"text-center mx-10"} size={100} />
          </div>
        </div>
        <div className={"flex flex-row justify-center mt-14 pt-5 px-5"}>
          <div className={"flex flex-col mx-5"}>
            <h3 className={"text-2xl font-raleway mb-4 text-center"}>
              Экспресс-доставка
            </h3>
            <p className={"text-center text-gray-700"}>
              Бесплатная доставка по всему Казахстану методом Der Mode Эконом
              или при выкупе товаров на определенную сумму, согласно условиям по
              каждому городу индивидуально. При оплате заказа на сайте
              банковской картой доставка любой службой бесплатна
            </p>
          </div>
          <div className={"flex flex-col mx-5"}>
            <h3 className={"text-2xl font-raleway mb-4 text-center"}>
              Примерка одежды перед покупкой
            </h3>
            <p className={"text-center text-gray-700"}>
              Интернет-магазин Der Mode даёт возможность примерить одежду и
              обувь перед оплатой заказа. Оплачивайте только то, что вам подошло
              и понравилось. Также у вас всегда есть целый год на то, что бы
              вернуть неподошедший товар почтой или курьеру при получении
              следующего заказа.
            </p>
          </div>
          <div className={"flex flex-col mx-5"}>
            <h3 className={"text-2xl text-center font-raleway mb-4"}>
              Удобные способы оплаты
            </h3>
            <p className={"text-center text-gray-700"}>
              Вы можете оплатить покупки не только наличными, но и банковской
              картой. У всех торговых представителей Der Mode Экспресс при себе
              есть мобильный терминал для оплаты картами. При оплате заказа на
              сайте банковской картой доставка любой службой бесплатна.
            </p>
          </div>
          <div className={"h-96"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
