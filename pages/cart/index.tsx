import React, { useEffect, useState, useCallback } from "react";
import CartItem from "../../components/CartItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";
import { registerForm } from "../../types";
import Head from "next/head";
import axios from "axios";
import { logIn } from "../../store/slices/currentUserSlice";

const Cart = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalLoginSelected, setModalLoginSelected] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [modalForm, setModalForm] = useState<registerForm>({
    email: "",
    password: "",
    name: "",
  });
  const [modalFormValid, setModalFormValid] = useState<boolean>(false);
  const userLoggedIn = useAppSelector((state) => state.currentUser.isLogged);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartAmount = useAppSelector((state) => state.cart.amount);
  const totalSum = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validateModalForm = useCallback(() => {
    if (modalForm.email.length > 5 && modalForm.password.length > 6) {
      setModalFormValid(true);
    } else {
      setModalFormValid(false);
    }
  }, [modalForm]);

  const success = (data: any) => {
    const { id } = data.userData;
    dispatch(logIn(id));
    setError("");
    setModalForm({
      email: "",
      password: "",
      name: "",
    });
    router.push("/cart/checkout");
  };

  const login = async () => {
    try {
      const res = await axios.post("/api/login", {
        email: modalForm.email,
        password: modalForm.password,
      });
      const data = await res.data;
      if (res.status === 200) {
        success(data);
      }

      if (res.status === 201 || res.status === 202) {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async () => {
    try {
      const res = await axios.post("/api/register", {
        email: modalForm.email,
        password: modalForm.password,
        name: modalForm.name,
      });
      const data = await res.data;
      if (res.status === 200) {
        success(data);
      }
      if (res.status === 201 || res.status === 202 || res.status === 203) {
        setError(data.message);
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modalLoginSelected ? login() : register();
  };

  const modal = (
    <div className={"flex justify-center items-center mx-auto"}>
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
          <div className={"flex flex-row justify-between sm:w-8/12 mt-10"}>
            <h3
              onClick={() => {
                setModalLoginSelected(true);
                setModalForm({
                  email: "",
                  password: "",
                  name: "",
                });
                validateModalForm();
                setError("");
              }}
              className={`font-raleway text-2xl hover:cursor-pointer mx-5 sm:mx-0 ${
                modalLoginSelected ? "border-b-2 border-b-black" : ""
              }`}
            >
              Войти
            </h3>
            <h3
              onClick={() => {
                setModalLoginSelected(false);
                setModalForm({
                  email: "",
                  password: "",
                  name: "",
                });
                validateModalForm();
                setError("");
              }}
              className={`font-raleway text-2xl hover:cursor-pointer ${
                modalLoginSelected ? "" : "border-b-2 border-b-black"
              }`}
            >
              Зарегистрироваться
            </h3>
          </div>
          <div className={"flex flex-col w-8/12 mt-10"}>
            {modalLoginSelected ? (
              ""
            ) : (
              <>
                <label className={"font-raleway text-2xl"} htmlFor={"username"}>
                  Имя
                </label>
                <input
                  onChange={(e) => {
                    //validateModalForm();
                    setModalForm({ ...modalForm, name: e.target.value });
                  }}
                  type={"text"}
                  id={"username"}
                  value={modalForm.name}
                  className={
                    "border-2 border-black rounded-md w-full h-10 mt-2 p-2 focus:outline-none"
                  }
                />
              </>
            )}
            <label className={"font-raleway text-2xl mt-5"}>Email</label>
            <input
              onChange={(e) => {
                //validateModalForm();
                setModalForm({ ...modalForm, email: e.target.value });
              }}
              value={modalForm.email}
              className={
                "border-2 border-black rounded-md w-full h-10 mt-2 p-2 focus:outline-none"
              }
              type={"email"}
            />
            <label className={"font-raleway text-2xl mt-5"}>Пароль</label>
            <input
              onChange={(e) => {
                //validateModalForm();
                setModalForm({ ...modalForm, password: e.target.value });
              }}
              value={modalForm.password}
              className={
                "border-2 border-black rounded-md w-full h-10 mt-2 p-2 focus:outline-none"
              }
              type={"password"}
            />
          </div>
          {error ? (
            <p className={"text-red-500 font-raleway text-2xl mt-5"}>{error}</p>
          ) : (
            ""
          )}
          <div className={"flex flex-row w-8/12 mt-10"}>
            <button
              onClick={() => setShowModal(false)}
              className={"font-raleway text-2xl w-1/2  h-10 rounded-md"}
            >
              Отмена
            </button>
            <button
              onClick={handleModalLogin}
              disabled={!modalFormValid}
              className={`bg-black text-white font-raleway text-2xl sm:w-1/2 px-3 sm:px-0 h-10 rounded-md ml-5 ${
                modalFormValid
                  ? "hover:bg-gray-800"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    validateModalForm();
  }, [modalForm, validateModalForm]);
  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <div className={"sm:p-8 mt-8 sm:mt-4"}>
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
                  key={item.id + item.size}
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
                  "flex flex-row mx-auto sm:w-9/12 px-5 sm:px-0 justify-between items-center"
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
