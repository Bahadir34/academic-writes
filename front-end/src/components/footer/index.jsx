import React, { useContext } from "react";
import { GlobalContext } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import api from "../../configs/apiConfig";
import { categoriesList } from "../../utils/categories";
import { documents } from "../../utils/documents";

const Footer = () => {
  const { user, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  console.log(user);

  const handleLogout = () => {
    api.post("/logout").then(() => {
      setUser({});
      navigate("/");
    });
  };

  return (
    <footer className="p-2 md:p-5 lg:px-10 lg:pt-10  bg-zinc-100 mt-10">
      <div className="flex flex-col md:flex-row md:justify-between  gap-10">
        <div>
          <h1 className="text-4xl font-serif text-zinc-600">ACADEMIC'S</h1>
        </div>
        <div>
          <h1 className="text-2xl font-semibold underline-offset-10 underline">
            User
          </h1>
          {user?._id ? (
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <Link to={"/add-assay"}>Add Assay</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold underline-offset-10 underline">
            Categories
          </h1>

          <ul className="flex flex-col gap-2 mt-3">
            {categoriesList.map((item) => (
              <li>
                <Link to={`/assays-by-category?category=${item.name}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-semibold underline-offset-10 underline">
            Documents
          </h1>
          <ul className="mt-3 flex flex-col gap-2">
            {documents.map((item) => (
              <li>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-center text-sm text-zinc-600 mt-5">
        <span className="font-serif text-zinc-400">ACADEMIC'S</span> 2025 &copy;
        All right reserved.
      </p>
    </footer>
  );
};

export default Footer;
