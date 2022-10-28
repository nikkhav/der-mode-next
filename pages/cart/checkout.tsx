import Head from "next/head";
import { useAppSelector } from "../../store/hooks";
import { OrderForm } from "../../types";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { clearCart } from "../../store/slices/cartSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const currentUser = useAppSelector((state) => state.currentUser);
  const totalSum = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentUser.id) {
      router.push("/");
    }
  }, [currentUser, router]);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    phone: "",
    streetAndNumber: "",
    entranceAndFloor: "",
    flat: "",
    comment: "",
  });
  const [orderFormValid, setOrderFormValid] = useState<boolean>(false);

  const today = new Date();
  const todayDate = [
    today.getDate(),
    today.getMonth() + 1,
    today.getFullYear(),
  ].join("-");

  const validateOrderForm = useCallback(() => {
    if (
      orderForm.phone.length > 5 &&
      orderForm.streetAndNumber.length > 5 &&
      orderForm.entranceAndFloor.length > 2 &&
      orderForm.flat.length > 0
    ) {
      setOrderFormValid(true);
    } else {
      setOrderFormValid(false);
    }
  }, [orderForm]);

  const sendOrderForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const order = {
      userId: currentUser.id,
      items: cartItems,
      totalSum,
      date: todayDate,
      phone: orderForm.phone,
      streetAndNumber: orderForm.streetAndNumber,
      entranceAndFloor: orderForm.entranceAndFloor,
      flat: orderForm.flat,
      comment: orderForm.comment,
    };
    try {
      const response = await axios.post(
        `/api/orders?userId=${currentUser.id}`,
        order
      );
      if (response.status === 201) {
        dispatch(clearCart());
        router.push("/cart/success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    validateOrderForm();
  }, [orderForm, validateOrderForm]);

  return (
    <>
      <Head>
        <title>Оформление заказа</title>
        <meta name="description" content="Оформление заказа" />
      </Head>
      <div className={"flex flex-col mt-8"}>
        <div className={"flex flex-row justify-center items-center"}>
          <h1 className={"text-4xl font-raleway"}>Оформление заказа</h1>
        </div>
        <div className={"flex flex-row justify-center items-center mt-10"}>
          <div className={"flex flex-col sm:w-4/12"}>
            <label
              className={"text-xl text-center mb-2 font-raleway"}
              htmlFor={"name"}
            >
              Номер телефона
            </label>
            <input
              type={"tel"}
              id={"phone"}
              value={orderForm.phone}
              onChange={(e) => {
                validateOrderForm();
                setOrderForm({ ...orderForm, phone: e.target.value });
              }}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              placeholder={"Введите номер телефона"}
            />
            <label
              className={"mt-5 mb-2 text-xl text-center font-raleway"}
              htmlFor={"email"}
            >
              Улица и дом
            </label>
            <input
              type={"text"}
              id={"street"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={orderForm.streetAndNumber}
              onChange={(e) => {
                validateOrderForm();
                setOrderForm({ ...orderForm, streetAndNumber: e.target.value });
              }}
              placeholder={"Улица и номер дома"}
            />
            <label
              className={"mt-5 text-xl text-center mb-2 font-raleway"}
              htmlFor={"phone"}
            >
              Подъезд и этаж
            </label>
            <input
              type={"text"}
              id={"floor"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={orderForm.entranceAndFloor}
              onChange={(e) => {
                validateOrderForm();
                setOrderForm({
                  ...orderForm,
                  entranceAndFloor: e.target.value,
                });
              }}
              placeholder={"Подъезд и этаж"}
            />
            <label
              className={"mt-5 text-xl text-center mb-2 font-raleway"}
              htmlFor={"address"}
            >
              Квартира
            </label>
            <input
              type={"text"}
              id={"flat"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={orderForm.flat}
              onChange={(e) => {
                validateOrderForm();
                setOrderForm({ ...orderForm, flat: e.target.value });
              }}
              placeholder={"Квартира"}
            />
            <label
              className={"mt-5 text-xl text-center mb-2 font-raleway"}
              htmlFor={"comment"}
            >
              Комментарий
            </label>
            <textarea
              id={"comment"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={orderForm.comment}
              onChange={(e) => {
                validateOrderForm();
                setOrderForm({ ...orderForm, comment: e.target.value });
              }}
              placeholder={"Введите комментарий"}
            />
            <button
              disabled={!orderFormValid}
              onClick={sendOrderForm}
              className={`bg-black text-white text-lg rounded-lg px-14 py-3 mt-5 font-raleway transition-colors hover:bg-gray-800 hover:shadow-lg ${
                orderFormValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
