"use client";
import { handleSubmit } from "@/lib/action";
import React, { useRef } from "react";

export default function MessageForm(props: any) {
  const chat = props.m;
  const ref = useRef<HTMLFormElement>(null);

  
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await handleSubmit(formData, chat);
        ref.current?.reset();
      }}
      className="flex w-full items-center  gap-3"
    >
      <input
        className="outline-blue-200 outline flex-grow px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
        type="text"
        placeholder="message"
        name="message"
      />
      <button
        type="submit"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        send.
      </button>
    </form>
  );
}
