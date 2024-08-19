import React from "react";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeSwitch } from "./theme-switch";
const Header = () => {
  return (
    <div className="flex justify-between items-center px-10 py-5">
      <Image src="/logo.svg" alt="logo" width={200} height={50} />
      <div className="flex gap-8 items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Header;
