import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IItem, ProductsPageProps } from "../../../types";
import connectDB from "../../../mongodb/database";
import Item from "../../../mongodb/models/itemModel";
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
  const category: string = router.query.category as string;
  useEffect(() => {
    if (selectedGender !== gender) dispatch(selectGender(gender));
  }, [selectedGender, gender, dispatch]);

  return (
    <div className={"flex flex-col sm:p-4"}>
      {items.length === 0 ? (
        <div className={"flex flex-col p-10 items-center justify-center"}>
          <h1 className={"text-4xl font-light"}>Нет товаров 😢</h1>
          <h2 className={"text-2xl font-light mt-8"}>
            Попробуйте другую категорию
          </h2>
          <Link href={"/"}>
            <a className={"px-4 py-2 mt-10 bg-black rounded-xl text-white"}>
              Вернуться на главную
            </a>
          </Link>
        </div>
      ) : (
        <div className={"flex flex-row flex-wrap justify-evenly sm:p-4"}>
          {items.map((item: IItem) => {
            return (
              <ItemCard
                title={item.title}
                price={item.price}
                brand={item.brand}
                image={item.images[0]}
                key={item._id}
                path={`/${gender}/${category}/${item._id}`}
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
  await connectDB();
  let itemsDB;

  switch (category) {
    case "all": {
      itemsDB = await Item.find({
        gender: gender,
      });
      break;
    }
    case "new": {
      itemsDB = await Item.find({
        gender: gender,
        new: true,
      });
      break;
    }
    default: {
      itemsDB = await Item.find({
        gender: gender,
        category: category,
      });
      break;
    }
  }

  const items = JSON.parse(JSON.stringify(itemsDB));

  return {
    props: {
      items,
    },
  };
};

export default ProductsMain;
