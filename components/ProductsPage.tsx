import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { ProductsPageProps } from "../types";
import ItemCard from "./ItemCard";
import axios from "axios";

const ProductsPage: NextPage<ProductsPageProps> = ({ gender }) => {
  const [items, setItems] = useState([]);
  let genderRu = "";

  if (gender === "women") genderRu = "Женщинам";
  if (gender === "men") genderRu = "Мужчинам";
  if (gender === "kids") genderRu = "Детям";

  // TODO: Использовать getStaticProps

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setItems(res.data);
    });
  }, []);
  return (
    <div className={"flex flex-col p-4"}>
      <h1 className={"text-2xl"}>Главная/{genderRu}</h1>
      <div className={"flex flex-row flex-wrap justify-around p-4"}>
        {items.map((item: any, index) => {
          return (
            <ItemCard
              key={index}
              title={item.title}
              price={item.price}
              image={item.image}
            />
          );
        })}
        {/*<ItemCard title={"Test Item men"} price={1000} image={"/men.jpg"} />*/}
        {/*<ItemCard title={"Test Item women"} price={1000} image={"/women.jpg"} />*/}
        {/*<ItemCard title={"Test Item kids"} price={1000} image={"/kids.jpeg"} />*/}
        {/*<ItemCard title={"Test Item kids"} price={1000} image={"/kids.jpeg"} />*/}
        {/*<ItemCard title={"Test Item kids"} price={1000} image={"/kids.jpeg"} />*/}
      </div>
    </div>
  );
};

export default ProductsPage;
