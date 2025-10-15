import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import api from "../../configs/apiConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [type, setType] = useState("password");

  const [errorNoUser, setErrorNoUser] = useState(false);
  const [errorInactiveUser, setErrorInactiveUser] = useState(false);
  const [errorWrongCredentials, serErrorWrongCredentials] = useState(false);
  const [errorServer, setErrorServer] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const mail = e.target[0].value;
    const password = e.target[1].value;

    if (!mail || !password) {
      return;
    }

    api
      .post("/login", {
        email: mail,
        password: password,
      })
      .then((data) => {
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        switch (err.response.data.message) {
          case "There is no such a user!":
            setErrorNoUser(true);
            break;

          case "Inactive user, please get contact support service!":
            setErrorInactiveUser(true);
            break;

          case "Username or password is wrong!":
            serErrorWrongCredentials(true);
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
      <div className="flex flex-col items-center justify-center p-2 sm:p-10 border border-zinc-400 rounded-xl m-3">
        <h1 className="text-4xl font-light tracking-normal text-center">
          Wellcome to{" "}
          <span className="font-serif text-5xl bg-zinc-600/20 text-zinc-600 p-2 rounded-xl text-wider">
            ACADEMIC'S
          </span>
        </h1>
        <p className="mt-3 text-md tracking-wide text-zinc-400">
          Log in to access over 582K assays!
        </p>

        {errorNoUser ? (
          <p className="text-red-400 text-center">
            You are not registered user.
          </p>
        ) : errorInactiveUser ? (
          <p className="text-red-400 text-center">
            You are seeming inactive user for our system. Contact with support
            service
          </p>
        ) : errorWrongCredentials ? (
          <p className="text-red-400 text-center">Wrong email or password.</p>
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
            type="email"
            placeholder="xyz@example.com"
            className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
          />
          <div className="w-full relative">
            <input
              type={type}
              placeholder="password"
              className="px-4 py-2 border border-zinc-400 rounded-xl w-full outline-none"
            />
            <div
              onClick={() =>
                setType((prev) => (prev === "password" ? "text" : "password"))
              }
              className="absolute top-[50%] transform -translate-y-[50%] right-2 cursor-pointer"
            >
              {type === "password" ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-zinc-600 text-zinc-50 rounded-xl hover:bg-zinc-900 hover:text-white cursor-pointer transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
