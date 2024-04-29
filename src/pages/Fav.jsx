import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { data } from "../assets/data";

const Fav = () => {
  const fav = useSelector((state) => state.fav);

  return (
    <div className="">
      <div className="w-full min-h-fit p-10 md:p-20 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10mx-auto ">
        {fav.map((shoe, idx) => (
          <Card key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
};

export default Fav;
