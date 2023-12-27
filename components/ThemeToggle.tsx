"use client";

import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
export default function ThemeToggle() {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(getCurrentTheme());

  const mqListener = (e: any) => {
    setDarkMode(e.matches);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    if (theme === "dark" || darkThemeMq.matches) setDarkMode(true);
    else setDarkMode(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-8 flex items-center justify-center cursor-pointer dark:bg-mediums rounded-full bg-slate-200 p-1"
      onClick={() => setDarkMode(!darkMode)}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-white dark:bg-small rounded-full w-6 h-6 top-1 transition shadow-sm duration-300"
        style={darkMode ? { left: "4px" } : { right: "4px" }}
      ></div>
      <BsSunFill className="text-yellow-400 ml-auto" size={18} />
    </div>
  );
}
