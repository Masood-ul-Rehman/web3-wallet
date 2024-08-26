"use client";
import React, { useEffect } from "react";
import { useGetExistingWallets } from "@/lib/query/wallets/hooks/use-get-existing-wallets";
import { useUser } from "@clerk/clerk-react";
import Loader from "@/components/ui/loader";
import AllWallets from "./all-wallets";
import CreateWallet from "./create-wallet";

const Switcher = () => {
  const { isLoaded, user } = useUser();
  const { data, isLoading } = useGetExistingWallets(isLoaded, user?.id || "");
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      ) : data?.length > 0 ? (
        <AllWallets />
      ) : (
        <CreateWallet />
      )}
    </div>
  );
};

export default Switcher;
