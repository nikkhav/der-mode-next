import React, { useCallback, useEffect, useState } from "react";
import { loginForm, registerForm } from "../../types";
import axios from "axios";
import Head from "next/head";
import { useAppDispatch } from "../../store/hooks";
import { logIn } from "../../store/slices/currentUserSlice";
import { useRouter } from "next/router";

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
  const [error, setError] = useState<string>("");
  const [loginFormValid, setLoginFormValid] = useState<boolean>(false);
  const [registerFormValid, setRegisterFormValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateLoginForm = useCallback(() => {
    if (loginForm.email.length > 5 && loginForm.password.length > 5) {
      setLoginFormValid(true);
    } else {
      setLoginFormValid(false);
    }
  }, [loginForm]);

  const validateRegisterForm = useCallback(() => {
    if (
      registerForm.email.length > 5 &&
      registerForm.password.length > 6 &&
      registerForm.name.length > 2
    ) {
      setRegisterFormValid(true);
    } else {
      setRegisterFormValid(false);
    }
  }, [registerForm]);

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        email: loginForm.email,
        password: loginForm.password,
      });
      const data = await res.data;
      if (res.status === 200) {
        const { id } = data.userData;
        dispatch(logIn(id));
        setError("");
        setLoginForm({ email: "", password: "" });
        router.push(`${process.env.HOST}/account/${id}`);
      }

      if (res.status === 201 || res.status === 202) {
        setError(data.message);
        console.log(data.message);
      }
    } catch (err) {}
  };

  useEffect(() => {
    validateLoginForm();
    validateRegisterForm();
  }, [loginForm, registerForm, validateLoginForm, validateRegisterForm]);

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", {
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.name,
      });
      const data = await res.data;
      if (res.status === 200) {
        const { id } = data.userData;
        dispatch(logIn(id));
        setError("");
        setRegisterForm({ email: "", password: "", name: "" });
        alert("Вы успешно зарегистрировались!");
        router.push(`/account/${id}`);
      }
      if (res.status === 201 || res.status === 202 || res.status === 203) {
        setError(data.message);
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className={
          "flex flex-row mx-auto justify-around items-center sm:w-4/12 w-10/12 mt-10 p-3"
        }
      >
        <button
          onClick={() => {
            setError("");
            setLogin(true);
          }}
          className={`text-3xl font-raleway ${
            login ? "border-b-2 border-b-black" : ""
          }`}
        >
          Вход
        </button>
        <button
          onClick={() => {
            setError("");
            setLogin(false);
          }}
          className={`text-3xl font-raleway ${
            login ? "" : "border-b-2 border-b-black"
          }`}
        >
          Регистрация
        </button>
      </div>
      {login ? (
        <div
          className={
            "flex flex-col items-center justify-center mx-auto bg-black rounded-xl sm:w-4/12 w-11/12 p-10 mt-10"
          }
        >
          <form className={"flex flex-col"}>
            <label className={"text-white font-raleway"} htmlFor={"username"}>
              E-Mail
            </label>
            <input
              type={"email"}
              id={"email"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={loginForm.email}
              onChange={(e) => {
                setLoginForm({ ...loginForm, email: e.target.value });
                validateLoginForm();
              }}
              placeholder={"Введите e-mail"}
            />
            <label
              className={"mt-5 font-raleway text-white"}
              htmlFor={"password"}
            >
              Пароль
            </label>
            <input
              type={"password"}
              id={"password"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm({ ...loginForm, password: e.target.value });
                validateLoginForm();
              }}
              placeholder={"Введите пароль"}
            />
            {error && (
              <p className={"text-red-500 font-raleway text-center mt-5"}>
                {error}
              </p>
            )}
            <button
              disabled={!loginFormValid}
              className={`bg-white text-lg rounded p-2 mt-10 mb-4 transition-colors hover:bg-gray-200 ${
                loginFormValid ? "" : "opacity-90 cursor-not-allowed"
              }`}
              onClick={handleLogin}
              type={"submit"}
            >
              Войти
            </button>
          </form>
        </div>
      ) : (
        <div
          className={
            "flex flex-col items-center justify-center mx-auto bg-black rounded-xl sm:w-4/12 w-11/12 p-10 mt-10"
          }
        >
          <form className={"flex flex-col"}>
            <label className={"text-white font-raleway"} htmlFor={"username"}>
              Имя
            </label>
            <input
              type={"text"}
              id={"username"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={registerForm.name}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, name: e.target.value });
                validateRegisterForm();
              }}
              placeholder={"Введите имя"}
            />
            <label
              className={"mt-5 text-white font-raleway"}
              htmlFor={"username"}
            >
              E-Mail
            </label>
            <input
              type={"email"}
              id={"email"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={registerForm.email}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, email: e.target.value });
                validateRegisterForm();
              }}
              placeholder={"Введите e-mail"}
            />
            <label
              className={"mt-5 text-white font-raleway"}
              htmlFor={"password"}
            >
              Пароль
            </label>
            <input
              type={"password"}
              id={"password"}
              className={
                "border border-gray-400 text-center rounded-lg px-14 py-2 focus:outline-none"
              }
              value={registerForm.password}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, password: e.target.value });
                validateRegisterForm();
              }}
              placeholder={"Введите пароль"}
            />
            {error && (
              <p className={"text-red-500 font-raleway text-center mt-5"}>
                {error}
              </p>
            )}
            <button
              className={`bg-white text-lg rounded p-2 mt-10 mb-4 transition-colors hover:bg-gray-200 ${
                registerFormValid ? "" : "opacity-90 cursor-not-allowed"
              }`}
              disabled={!registerFormValid}
              onClick={handleRegister}
              type={"submit"}
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
