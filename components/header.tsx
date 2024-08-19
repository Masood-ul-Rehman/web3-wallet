"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ThemeSwitch from "./theme-switch";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return (
    <div className="flex justify-between items-center container px-10 py-5">
      <Image
        src={`/logo${isDarkMode ? "-dark" : "-light"}.svg`}
        alt="logo"
        width={200}
        height={50}
      />
      <div className="flex gap-8 items-center">
        <SignedOut>
          <SignInButton>
            <Button variant={"ghost"}>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeSwitch isDarkMode={isDarkMode} setTheme={setTheme} />
      </div>
    </div>
  );
};

export default Header;
