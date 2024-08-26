import React from "react";
import { auth } from "@clerk/nextjs/server";
import Switcher from "./components/switcher";

const Wallet = () => {
  const { userId } = auth();
  return (
    <div className="container  mt-12 md:px-14">
      <Switcher />
    </div>
  );
};

export default Wallet;
