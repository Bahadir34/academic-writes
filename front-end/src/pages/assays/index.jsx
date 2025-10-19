import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../configs/apiConfig";
import AssayItem from "./assay-item";

const Assays = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [assays, setAssays] = useState([]);
  const [countOfAssay, setCountOfAssay] = useState();

  const [errorNotFound, setErrorNotFound] = useState(null);

  useEffect(() => {
    getAssaysByCategory();
  }, []);

  const getAssaysByCategory = async () => {
    try {
      const category = searchParams.get("category");
      const search = searchParams.get("search");

      if (category) {
        const res = await api.get(`/get-assay?category=${category}`);

        setAssays(res.data.data.assays);
        setCountOfAssay(res.data.data.length);
      } else if (search) {
        const res = await api.get(
          `/get-assays-via-search-param?search=${search}`
        );

        setAssays(res.data.data);
        setCountOfAssay(res.data.length);
      }
    } catch (error) {
      console.log(error);
      setErrorNotFound(error.response.data.message);
    }
  };

  if (errorNotFound) {
    return (
      <div className="grid place-items-center mt-10">
        <p className="text-center text-red-400">{errorNotFound}</p>
        <Link
          to={"/"}
          className="px-4 py-2 mt-3 border rounded-xl text-blue-400"
        >
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="px-10 mt-5">
      <p className="text-xl text-zinc-900 cursor-default">
        Results for{" "}
        <span className="font-semibold underline">
          {searchParams.get("category") || searchParams.get("search") + " "}
        </span>
        <span className="text-md text-zinc-400">
          {" "}
          {"("}Founded {countOfAssay} assays {")"}
        </span>
      </p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10">
        {assays.map((assay, key) => (
          <AssayItem assay={assay} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Assays;
