"use client";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function UserClick(props: any) {
  const users = props.users;
  const router = useRouter();

  function openChat(id: string) {
    router.push(`/${id}`);
  }

  return (
    <div className="pb-5 flex flex-col justify-between pt-0 pl-16 h-full flex-shrink-0 pr-16 shadow-md bg-white z-10 dark:text-white dark:bg-dark">
      <div className="flex gap-3 flex-col">
        <h1 className="font-bold">users.</h1>
        {users.map((user: any) => (
          <div
            onClick={() => openChat(user.uid)}
            key={user.uid}
            className="flex gap-5 items-center w-full hover:shadow-xl cursor-pointer"
          >
            <img
              className="w-10 h-10 rounded-sm"
              src={user.imageUrl || ""}
              alt="avatar"
            ></img>
            <div>{user.username}</div>
          </div>
        ))}
      </div>
      <div >
        <ThemeToggle />
      </div>
    </div>
  );
}
