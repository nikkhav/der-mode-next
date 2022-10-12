import React from "react";
import { NextPage } from "next";
import { ProductsPageProps } from "../types";
import ItemCard from "./ItemCard";

const ProductsPage: NextPage<ProductsPageProps> = ({ gender }) => {
  let genderRu = "";

  if (gender === "women") genderRu = "Женщинам";
  if (gender === "men") genderRu = "Мужчинам";
  if (gender === "kids") genderRu = "Детям";

  // TODO: Использовать getStaticProps

  return (
    <div className={"flex flex-col p-4"}>
      <h1 className={"text-2xl"}>Главная/{genderRu}</h1>
      <div className={"flex flex-row flex-wrap justify-evenly p-4"}>
        {/*{items.map((item: any, index) => {*/}
        {/*  return (*/}
        {/*    <ItemCard*/}
        {/*      key={index}*/}
        {/*      title={item.title}*/}
        {/*      price={item.price}*/}
        {/*      image={item.image}*/}
        {/*    />*/}
        {/*  );*/}
        {/*})}*/}
        <ItemCard
          title={"Кожаная куртка"}
          price={10000}
          brand={"Zara"}
          image={"/images/test-image-4.jpg"}
        />
        <ItemCard
          title={"Свитер"}
          price={2500}
          brand={"Uniqlo"}
          image={"/images/test-image-3.jpg"}
        />
        <ItemCard
          title={"Жилетка"}
          price={5500}
          brand={"Zara"}
          image={"/images/test-image-1.jpg"}
        />
        <ItemCard
          title={"Свитер"}
          price={2500}
          brand={"Uniqlo"}
          image={"/images/test-image-2.jpg"}
        />
        <ItemCard
          title={"Свитер"}
          price={2500}
          brand={"Uniqlo"}
          image={"/images/test-image-2.jpg"}
        />
        <ItemCard
          title={"Свитер"}
          price={2500}
          brand={"Uniqlo"}
          image={"/images/test-image-2.jpg"}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
