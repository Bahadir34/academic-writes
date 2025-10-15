import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const hamburgerRef = useRef();

  useEffect(() => {
    const handleScreenClick = (event) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target) &&
        !event.target.closest("#hamburger-btn")
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleScreenClick);

    return () => document.removeEventListener("click", handleScreenClick);
  }, []);

  return (
    <header className="flex items-center justify-between px-2 py-2 md:px-10 md:py-5 gap-5 relative">
      <div className="flx">
        <Link
          to={"/"}
          className="font-serif text-2xl font-bold tracking-wider leading-3 text-zinc-600"
        >
          ACADEMIC'S
        </Link>
      </div>
      <div className="w-full hidden sm:block md:w-[30%] lg:w-[40%]  ">
        <form action="" className="w-full relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-zinc-400 rounded-md text-zinc-900 outline-none"
          />
          <CiSearch className="absolute top-[50%] transform -translate-y-[50%] right-2 text-zinc-500 hover:text-zinc-900     size-7 cursor-pointer" />
        </form>
      </div>

      <nav className="  gap-5 hidden sm:flex ">
        <Link
          to={"/login"}
          className="px-4 py-2 border rounded-md text-blue-500 hover:bg-blue-500 hover:text-zinc-100 transition duration-300 whitespace-nowrap"
        >
          Log in
        </Link>
        <Link
          to={"/register"}
          className="px-4 py-2 border rounded-md text-green-500 hover:bg-green-500 hover:text-zinc-100 transition duration-300 whitespace-nowrap "
        >
          Join Us
        </Link>
      </nav>
      <div className="block sm:hidden" id="hamburger-btn">
        <IoMenuOutline
          className="size-8 cursor-pointer"
          onClick={() => setIsVisible(!isVisible)}
        />
      </div>
      <nav
        ref={hamburgerRef}
        className={`flex flex-col gap-2 sm:hidden absolute -right-30 top-12 bg-white  ${
          isVisible && "right-5"
        } transition-all duration-300`}
      >
        <Link
          to={"/login"}
          onClick={() => setIsVisible(false)}
          className="px-4 py-2 border rounded-md text-blue-500 hover:bg-blue-500 hover:text-zinc-100 transition duration-300 whitespace-nowrap"
        >
          Log in
        </Link>
        <Link
          to={"/register"}
          onClick={() => setIsVisible(false)}
          className="px-4 py-2 border rounded-md text-green-500 hover:bg-green-500 hover:text-zinc-100 transition duration-300 whitespace-nowrap "
        >
          Join Us
        </Link>
      </nav>
    </header>
  );
};

export default Header;
