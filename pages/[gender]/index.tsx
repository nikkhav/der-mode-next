import React from "react";
import ProductsPage from "../../components/ProductsPage";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const gender: string = router.query.gender as string;
  return (
    <div>
      <ProductsPage gender={gender} />
    </div>
  );
};

export default Main;
