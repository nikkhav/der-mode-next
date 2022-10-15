import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Item, ProductsPageProps } from "../../../types";
import axios from "axios";
import ItemCard from "../../../components/ItemCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectGender } from "../../../store/slices/currentUserSlice";
import Link from "next/link";

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
      {items.length === 0 ? (
        <div className={"flex flex-col items-center justify-center"}>
          <h1 className={"text-3xl font-light"}>Нет товаров 😢</h1>
          <h2 className={"text-xl font-light mt-8"}>
            Попробуйте другую категорию
          </h2>
          <Link href={"/"}>
            <a className={"px-4 py-2 mt-10 bg-black rounded-xl text-white"}>
              Вернуться на главную
            </a>
          </Link>
        </div>
      ) : (
        <div className={"flex flex-row flex-wrap justify-evenly p-4"}>
          {items.map((item: Item) => {
            return (
              <ItemCard
                title={item.title}
                price={item.price}
                brand={item.brand}
                image={item.images[0]}
                key={item._id}
                path={`/${gender}/${item._id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    {
      params: {
        gender: "men",
        category: "clothes",
      },
    },
    {
      params: {
        gender: "men",
        category: "shoes",
      },
    },
    {
      params: {
        gender: "men",
        category: "accessories",
      },
    },
    {
      params: {
        gender: "men",
        category: "all",
      },
    },
    {
      params: {
        gender: "men",
        category: "new",
      },
    },
    {
      params: {
        gender: "women",
        category: "clothes",
      },
    },
    {
      params: {
        gender: "women",
        category: "shoes",
      },
    },
    {
      params: {
        gender: "women",
        category: "accessories",
      },
    },
    {
      params: {
        gender: "women",
        category: "all",
      },
    },
    {
      params: {
        gender: "women",
        category: "new",
      },
    },
    {
      params: {
        gender: "kids",
        category: "clothes",
      },
    },
    {
      params: {
        gender: "kids",
        category: "shoes",
      },
    },
    {
      params: {
        gender: "kids",
        category: "accessories",
      },
    },
    {
      params: {
        gender: "kids",
        category: "all",
      },
    },
    {
      params: {
        gender: "kids",
        category: "new",
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
  const category = context.params?.category;
  let res;

  switch (category) {
    case "all": {
      res = await axios.get(`${process.env.HOST}/api/items/${gender}`);
      break;
    }
    case "new": {
      res = await axios.get(`${process.env.HOST}/api/items/${gender}/newItems`);
      break;
    }
    default: {
      res = await axios.get(
        `${process.env.HOST}/api/items/${gender}/${category}`
      );
      break;
    }
  }

  const items = res.data.items;

  return {
    props: {
      items,
    },
  };
};

export default ProductsMain;
