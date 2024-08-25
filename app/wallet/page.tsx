import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = () => {
  const { userId } = auth();

  return (
    <div className="container">
      <h1>Wallet</h1>
    </div>
  );
};

export default page;
