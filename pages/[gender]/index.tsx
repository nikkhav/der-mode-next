import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Item, ProductsPageProps } from "../../types";
import axios from "axios";
import ItemCard from "../../components/ItemCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectGender } from "../../store/slices/currentUserSlice";

const ProductsMain: NextPage<ProductsPageProps> = ({ items }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedGender = useAppSelector(
    (state) => state.currentUser.selectedGender
  );
  const gender: string = router.query.gender as string;

  useEffect(() => {
    if (selectedGender !== gender) dispatch(selectGender(gender));
  }, [selectedGender, gender]);

  let genderRu = "";

  if (gender === "women") genderRu = "Женщинам";
  if (gender === "men") genderRu = "Мужчинам";
  if (gender === "kids") genderRu = "Детям";

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
              path={`/${gender}/${item._id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    {
      params: {
        gender: "men",
      },
    },
    {
      params: {
        gender: "women",
      },
    },
    {
      params: {
        gender: "kids",
      },
    },
  ];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const gender = context.params?.gender;
  const res = await axios.get(`${process.env.HOST}/api/items/${gender}`);

  const items = res.data.items;

  return {
    props: {
      items,
    },
  };
};

export default ProductsMain;
