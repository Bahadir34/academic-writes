import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import api from "../../configs/apiConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [type, setType] = useState("password");
  const [confType, setConType] = useState("password");
  const [isChecked, setIsChecked] = useState(false);

  const [errorUnique, setErrorUnique] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [errorSaving, setErrorSaving] = useState(false);
  const [errorPasswordVerification, serErrorPasswordVerification] =
    useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
      isActive: true,
    };

    if (data.password !== e.target[4].value)
      return serErrorPasswordVerification(true);

    if (!(data.firstName || data.lastName || data.email || data.password)) {
      return;
    }

    api
      .post("register", data)
      .then((data) => {
        navigate("/login");

        console.log(data);
      })
      .catch((err) => {
        switch (err.response.data.message) {
          case "The user wanted to register is already registered before!":
            setErrorUnique(true);
            break;

          case "Something went wrong while trying to create a new user!":
            setErrorSaving(true);
            break;

          default:
            setErrorServer(true);
            break;
        }

        console.log(err);
      });
  };

  return (
    <div className=" flex items-center justify-center my-auto">
      <div className="flex flex-col items-center justify-center  p-2 sm:p-10 border border-zinc-400 rounded-xl m-3">
        <h1 className="text-4xl font-light tracking-normal text-center">
          Wellcome to{" "}
          <span className="font-serif text-5xl bg-zinc-600/20 text-zinc-600 p-2 rounded-xl text-wider">
            ACADEMIC'S
          </span>
        </h1>
        <p className="mt-3 text-md tracking-wide text-zinc-400">
          Sign up to access over 582K assays!
        </p>
        {errorUnique ? (
          <p className="text-red-400 text-center">
            You have already an account.
          </p>
        ) : errorSaving ? (
          <p className="text-red-400 text-center">
            Something went wrong, please check your informations.
          </p>
        ) : errorServer ? (
          <p className="text-red-400 text-center">Something went wrong!</p>
        ) : (
          <div className="h-[24px]"></div>
        )}
        <form
          onSubmit={handleLogin}
          className="mt-5 flex flex-col items-center justify-center gap-3 w-full md:w-[70%]"
        >
          <input
            type="text"
            placeholder="First name"
            className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
          />

          <input
            type="Last name"
            placeholder="Last name"
            className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
          />
          <input
            type="email"
            placeholder="xyz@example.com"
            className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
          />
          <div className="w-full relative">
            <input
              onChange={() => serErrorPasswordVerification(false)}
              type={type}
              placeholder="password"
              className={`px-4 py-2 border rounded-xl w-full outline-none transition duration-300 ${
                errorPasswordVerification ? "border-red-400" : "border-zinc-400"
              }`}
            />
            <div
              onClick={() =>
                setType((prev) => (prev === "password" ? "text" : "password"))
              }
              className="absolute top-[50%] transform -translate-y-[50%] right-2 cursor-pointer "
            >
              {type === "password" ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          <div className="w-full relative">
            <input
              onChange={() => serErrorPasswordVerification(false)}
              type={confType}
              placeholder="Confirm password"
              className={`px-4 py-2 border  rounded-xl w-full outline-none transition duration-300 ${
                errorPasswordVerification ? "border-red-400" : "border-zinc-400"
              }`}
            />
            <div
              onClick={() =>
                setConType((prev) =>
                  prev === "password" ? "text" : "password"
                )
              }
              className="absolute top-[50%] transform -translate-y-[50%] right-2 cursor-pointer"
            >
              {confType === "password" ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="cond"
              className="bg-zinc-700"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="cond" className="text-sm text-zinc-500">
              I read and accept
              <span className="text-blue-400"> Terms of Use</span> and
              <span className="text-blue-400"> Privacy Policy</span>
            </label>
          </div>
          <button
            disabled={!isChecked}
            type="submit"
            className={`w-full px-4 py-2 rounded-xl  transition duration-300 ${
              isChecked
                ? "cursor-pointer  bg-zinc-600 text-zinc-50 hover:text-white hover:bg-zinc-900"
                : "cursor-not-allowed bg-zinc-600 text-zinc-50"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
