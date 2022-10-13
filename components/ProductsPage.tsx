import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { ProductsPageProps } from "../types";
import ItemCard from "./ItemCard";
import axios from "axios";
import { Item } from "../types";

const ProductsPage: NextPage<ProductsPageProps> = ({ gender }) => {
  const [items, setItems] = useState([]);
  let genderRu = "";

  if (gender === "women") genderRu = "Женщинам";
  if (gender === "men") genderRu = "Мужчинам";
  if (gender === "kids") genderRu = "Детям";

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await axios.get("/api/items");
    if (res.status === 200) {
      setItems(res.data.items);
    }
  };
  console.log(items);

  // TODO: Использовать getStaticProps

  return (
    <div className={"flex flex-col p-4"}>
      <h1 className={"text-2xl"}>Главная/{genderRu}</h1>
      <div className={"flex flex-row flex-wrap justify-evenly p-4"}>
        {items.map((item: Item) => {
          return (
            <ItemCard
              title={item.title}
              price={item.price}
              brand={item.brand}
              image={item.image}
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
