"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

const ThemeSwitch = ({
  isDarkMode,
  setTheme,
}: {
  isDarkMode: boolean;
  setTheme: any;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-5 w-5 ${isDarkMode ? "text-primary/50" : "text-primary"}`}
      />
      <Switch
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon
        className={`h-5 w-5 ${isDarkMode ? "text-primary" : "text-primary/50"}`}
      />
    </div>
  );
};
export default ThemeSwitch;
