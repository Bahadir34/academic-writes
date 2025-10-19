import React, { useEffect, useState } from "react";
import Hero from "./hero";
import Categories from "./categories";
import HowItWorks from "./how-it-works";
import api from "../../configs/apiConfig";

const Home = () => {
  const [numberOfUsers, setNumberOfUsers] = useState(undefined);
  const [assayAnalise, setAssayAnalise] = useState([]);

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    try {
      const numberOfUsers = api.get("/number-of-users");
      const assayAnalise = api.get("/get-assay-categorise");

      const [users, assays] = await Promise.all([numberOfUsers, assayAnalise]);

      setNumberOfUsers(users.data.number_of_users);
      setAssayAnalise(assays.data.data);

      console.log(res);
    } catch (error) {}
  };
  return (
    <div className="">
      <Hero userCount={numberOfUsers} assayAnalise={assayAnalise} />
      <Categories />
      <HowItWorks />
    </div>
  );
};

export default Home;
