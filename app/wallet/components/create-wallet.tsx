import { Button } from "@/components/ui/button";
import React from "react";

const CreateWallet = () => {
  return (
    <div>
      <h1 className="sm:text-5xl text-3xl font-bold">
        We supports multiple blockchains
      </h1>
      <p className="dark:text-gray-300 text-xl mt-4 ">
        Choose a blockchain to get started. .
      </p>
      <div className="flex gap-4 mt-6">
        <Button className="w-[140px] h-[45px]">Ethereum</Button>
        <Button className="w-[140px] h-[45px]"> Solana</Button>
      </div>
    </div>
  );
};

export default CreateWallet;
