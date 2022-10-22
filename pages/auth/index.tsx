import React, { useState } from "react";
import { loginForm, registerForm } from "../../types";
import axios from "axios";
import Head from "next/head";

// TODO: Очистка формы после отправки
// TODO: Изменить стэйт loggedin в store

const Auth = () => {
  const [login, setLogin] = useState<boolean>(true);
  let title: string = login ? "Вход" : "Регистрация";
  const [loginForm, setLoginForm] = useState<loginForm>({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState<registerForm>({
    email: "",
    password: "",
    name: "",
  });
  const [loginFormValid, setLoginFormValid] = useState<boolean>(false);
  const [registerFormValid, setRegisterFormValid] = useState<boolean>(false);

  const validateLoginForm = () => {
    if (loginForm.email.length > 5 && loginForm.password.length > 5) {
      setLoginFormValid(true);
    } else {
      setLoginFormValid(false);
    }
  };

  const validateRegisterForm = () => {
    if (
      registerForm.email.length > 5 &&
      registerForm.password.length > 6 &&
      registerForm.name.length > 2
    ) {
      setRegisterFormValid(true);
    } else {
      setRegisterFormValid(false);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post("/api/login", {
        email: loginForm.email,
        password: loginForm.password,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleRegister = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post("/api/register", {
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.name,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2"
              }
              value={loginForm.email}
              onChange={(e) => {
                setLoginForm({ ...loginForm, email: e.target.value });
                validateLoginForm();
              }}
              placeholder={"Введите e-mail"}
            />
            <label className={"mt-5"} htmlFor={"password"}>
              Пароль
            </label>
            <input
              type={"password"}
              id={"password"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2"
              }
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm({ ...loginForm, password: e.target.value });
                validateLoginForm();
              }}
              placeholder={"Введите пароль"}
            />
            <button
              disabled={!loginFormValid}
              className={`bg-black text-white text-lg rounded p-2 mt-10 mb-4 transition-colors hover:bg-gray-800 ${
                loginFormValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleLogin}
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
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2"
              }
              value={registerForm.name}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, name: e.target.value });
                validateRegisterForm();
              }}
              placeholder={"Введите имя"}
            />
            <label className={"mt-5"} htmlFor={"username"}>
              E-Mail
            </label>
            <input
              type={"email"}
              id={"email"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2"
              }
              value={registerForm.email}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, email: e.target.value });
                validateRegisterForm();
              }}
              placeholder={"Введите e-mail"}
            />
            <label className={"mt-5"} htmlFor={"password"}>
              Пароль
            </label>
            <input
              type={"password"}
              id={"password"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2"
              }
              value={registerForm.password}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, password: e.target.value });
                validateRegisterForm();
              }}
              placeholder={"Введите пароль"}
            />
            <button
              className={`bg-black text-white text-lg rounded p-2 mt-10 mb-4 transition-colors hover:bg-gray-800 ${
                registerFormValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!registerFormValid}
              onClick={handleRegister}
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
