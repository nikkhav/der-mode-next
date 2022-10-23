import React, { useState } from "react";
import { loginForm, registerForm } from "../../types";
import axios from "axios";
import Head from "next/head";
import { useAppDispatch } from "../../store/hooks";
import { logIn } from "../../store/slices/currentUserSlice";
import { useRouter } from "next/router";

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
  const [error, setError] = useState<string>("");
  const [loginFormValid, setLoginFormValid] = useState<boolean>(false);
  const [registerFormValid, setRegisterFormValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

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
        alert("Вы успешно вошли!");
        router.push("/");
      }

      if (res.status === 201 || res.status === 202) {
        setError(data.message);
        console.log(data.message);
      }
    } catch (err) {}
  };

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
        router.push("/");
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
          "flex flex-row mx-auto justify-around items-center w-4/12 mt-10 p-3"
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
            {error && (
              <p className={"text-red-500 font-raleway text-center mt-5"}>
                {error}
              </p>
            )}
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
            {error && (
              <p className={"text-red-500 font-raleway text-center mt-5"}>
                {error}
              </p>
            )}
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
