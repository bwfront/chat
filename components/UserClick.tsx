"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function UserClick(props: any) {
  const users = props.users;
  const router = useRouter();

  function openChat(id: string) {
    router.push(`/c/${id}`);
  }

  return (
    <div className="pb-10 flex flex-col gap-3 pt-0 pl-24 pr-16 w-fit h-full shadow-md bg-white z-10">
      <h1 className="font-bold">users.</h1>
      {users.map((user: any) => (
        <div
          onClick={() => openChat(user.uid)}
          key={user.uid}
          className="flex gap-5 items-center hover:shadow-xl cursor-pointer"
        >
          <img
            className="w-10 h-10 rounded-sm"
            src={user.imageUrl || ""}
            alt="avatar"
          ></img>
          <h2>{user.username}</h2>
        </div>
      ))}
    </div>
  );
}
