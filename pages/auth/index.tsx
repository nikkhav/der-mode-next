import React, { useState } from "react";

const Auth = () => {
  const [login, setLogin] = useState<boolean>(true);
  return (
    <>
      <div
        className={
          "flex flex-row mx-auto justify-around items-center w-4/12 mt-10 p-3"
        }
      >
        <button
          onClick={() => setLogin(true)}
          className={`text-3xl font-raleway ${
            login ? "border-b-2 border-b-black" : ""
          }`}
        >
          Вход
        </button>
        <button
          onClick={() => setLogin(false)}
          className={`text-3xl font-raleway ${
            login ? "" : "border-b-2 border-b-black"
          }`}
        >
          Регистрация
        </button>
      </div>
      {login ? (
        <div className={"flex flex-col items-center justify-center mt-10"}>
          <form className={"flex flex-col"}>
            <label htmlFor={"username"}>E-Mail</label>
            <input
              type={"email"}
              id={"email"}
              className={"border border-gray-400 rounded-lg px-6 py-2"}
              placeholder={"Введите e-mail"}
            />
            <label className={"mt-5"} htmlFor={"password"}>
              Пароль
            </label>
            <input
              type={"password"}
              id={"password"}
              className={"border border-gray-400 rounded-lg px-6 py-2"}
              placeholder={"Введите пароль"}
            />
            <button
              className={"bg-blue-500 text-white text-lg rounded p-2 mt-5 mb-4"}
            >
              Войти
            </button>
          </form>
        </div>
      ) : (
        <div className={"flex flex-col items-center justify-center mt-10"}>
          <form className={"flex flex-col"}>
            <label htmlFor={"username"}>Имя</label>
            <input
              type={"text"}
              id={"username"}
              className={"border border-gray-400 rounded-lg px-6 py-2"}
              placeholder={"Введите имя"}
            />
            <label className={"mt-5"} htmlFor={"username"}>
              E-Mail
            </label>
            <input
              type={"email"}
              id={"email"}
              className={"border border-gray-400 rounded-lg px-6 py-2"}
              placeholder={"Введите e-mail"}
            />
            <label className={"mt-5"} htmlFor={"password"}>
              Пароль
            </label>
            <input
              type={"password"}
              id={"password"}
              className={"border border-gray-400 rounded-lg px-6 py-2"}
              placeholder={"Введите пароль"}
            />
            <button
              className={"bg-blue-500 text-white text-lg rounded p-2 mt-5 mb-4"}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Auth;
