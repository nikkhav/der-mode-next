import React from "react";
import { useRouter } from "next/router";

const CustomerProfile = () => {
  const router = useRouter();
  const { customerId } = router.query;
  return (
    <div>
      <h1>Customer Profile - {customerId}</h1>
    </div>
  );
};

export default CustomerProfile;
