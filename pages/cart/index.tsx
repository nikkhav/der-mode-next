import React, { useState } from "react";
import CartItem from "../../components/CartItem";
import { useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";
import Head from "next/head";

const Cart = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalLoginSelected, setModalLoginSelected] = useState<boolean>(true);
  const userLoggedIn = useAppSelector((state) => state.currentUser.isLogged);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartAmount = useAppSelector((state) => state.cart.amount);
  const totalSum = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const router = useRouter();

  const modal = (
    <div
      className={
        "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center animate-opacity"
      }
    >
      <div className={"bg-white flex flex-col rounded-xl items-center p-14"}>
        <h1 className={"text-4xl text-center font-raleway mt-5"}>
          Вы почти у цели!
        </h1>
        <h2 className={"text-2xl text-center font-raleway mt-5"}>
          Для оформления заказа войдите или зарегистрируйтесь
        </h2>
        <div className={"flex flex-row justify-between w-8/12 mt-10"}>
          <h3
            onClick={() => setModalLoginSelected(true)}
            className={`font-raleway text-2xl hover:cursor-pointer ${
              modalLoginSelected ? "border-b-2 border-b-black" : ""
            }`}
          >
            Войти
          </h3>
          <h3
            onClick={() => setModalLoginSelected(false)}
            className={`font-raleway text-2xl hover:cursor-pointer ${
              modalLoginSelected ? "" : "border-b-2 border-b-black"
            }`}
          >
            Зарегистрироваться
          </h3>
        </div>
        <div className={"flex flex-col w-8/12 mt-10"}>
          <h3 className={"font-raleway text-2xl"}>Email</h3>
          <input
            className={"border-2 border-black rounded-md w-full h-10 mt-2 p-2"}
            type={"text"}
          />
          <h3 className={"font-raleway text-2xl mt-5"}>Пароль</h3>
          <input
            className={"border-2 border-black rounded-md w-full h-10 mt-2 p-2"}
            type={"password"}
          />
        </div>
        <div className={"flex flex-row w-8/12 mt-10"}>
          <button
            onClick={() => setShowModal(false)}
            className={"font-raleway text-2xl w-1/2 h-10 rounded-md"}
          >
            Отмена
          </button>
          <button
            onClick={() => router.push("/cart/checkout")}
            className={
              "bg-black text-white font-raleway text-2xl w-1/2 h-10 rounded-md ml-5"
            }
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <div className={"p-8 mt-4"}>
        {showModal && modal}
        {cartItems.length > 0 ? (
          <>
            <h1 className={"text-3xl text-center font-raleway"}>
              Оформление заказа
            </h1>
            <h2 className={"text-2xl text-center font-thin my-3 mb-10"}>
              {cartAmount} товара на сумму {totalSum} ₽
            </h2>

            {cartItems.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  path={`/${item.gender}/${item.category}/${item.id}`}
                  price={item.price}
                  quantity={item.quantity}
                  brand={item.brand}
                  size={item.size}
                />
              );
            })}
            <div className={"flex flex-col mt-10 justify-center items-center"}>
              <div className={"flex flex-row justify-between"}>
                <h1 className={"text-4xl font-raleway mb-6"}>Всё верно?</h1>
              </div>
              <div
                className={
                  "flex flex-row mx-auto w-9/12 justify-between items-center"
                }
              >
                <div className={"flex flex-col my-10"}>
                  <h1 className={"text-3xl font-raleway mb-4"}>
                    Итого: {totalSum} ₽
                  </h1>
                  <h2 className={"text-2xl font-thin"}>
                    Стоимость доставки: 500 ₽
                  </h2>
                </div>
                <div className={"flex flex-col items-center"}>
                  <button
                    onClick={() =>
                      userLoggedIn
                        ? router.push("/cart/checkout")
                        : setShowModal(true)
                    }
                    className={
                      "border-2 border-black bg-black text-2xl text-white font-raleway px-4 py-1 rounded-lg hover:bg-gray-700 hover:border-gray-700 transition-colors"
                    }
                  >
                    Продолжить
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            className={"flex flex-col items-center justify-center mt-10 p-4"}
          >
            <h1 className={"text-3xl text-center font-raleway"}>
              Корзина пуста
            </h1>
            <h2 className={"text-2xl text-center font-thin my-3"}>
              Вернитесь в каталог, чтобы добавить товары в корзину
            </h2>
            <button
              onClick={() => router.push("/")}
              className={
                "bg-black text-white text-2xl px-4 py-2 mt-10 mb-24 rounded-xl"
              }
            >
              Вернуться на главную
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
