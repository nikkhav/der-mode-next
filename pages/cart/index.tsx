import React from "react";
import CartItem from "../../components/CartItem";
import { useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartAmount = useAppSelector((state) => state.cart.amount);
  const totalSum = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const router = useRouter();
  // TODO: Починить чтобы товар убирался из корзины если его количество становится 0
  return (
    <div className={"p-8 mt-4"}>
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
          <div
            className={
              "flex flex-row mx-auto mt-10 w-9/12 justify-between items-center"
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
              <h1 className={"text-2xl font-raleway mb-6"}>Всё верно?</h1>

              <button
                className={
                  "border-2 border-gray-200 text-2xl px-4 py-1 rounded-xl hover:bg-black hover:text-white hover:border-black transition-colors"
                }
              >
                Продолжить
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={"flex flex-col items-center justify-center p-4"}>
          <h1 className={"text-3xl text-center font-raleway"}>Корзина пуста</h1>
          <h2 className={"text-2xl text-center font-thin my-3"}>
            Вернитесь в каталог, чтобы добавить товары в корзину
          </h2>
          <button
            onClick={() => router.push("/")}
            className={
              "bg-black text-white text-2xl px-4 py-2 mt-10 rounded-xl"
            }
          >
            Вернуться на главную
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
