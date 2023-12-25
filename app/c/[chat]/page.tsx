import React from "react";
import { getXataClient } from "@/src/xata";
import { auth } from "@clerk/nextjs";

export default async function Page({ params }: { params: { chat: string } }) {
  const { userId } = auth();
  const otherUserId = params.chat;
  const xataClient = getXataClient();
  let chat: any;

  const searchChats = await xataClient.db.pchat
    .filter({
      participants: { $includes: userId! && otherUserId },
    })
    .getMany();
  if (searchChats.length > 0) {
    chat = searchChats[0];
  }

  if (searchChats.length === 0) {
    const createChat = await xataClient.db.pchat.create({
      participants: [userId || "", otherUserId],
    });
    chat = createChat;
  }
  
  async function handleSubmit (data: FormData) {
    "use server";
    xataClient.db.messages.create({
      chatid: 'sadsad',
      sender: 'userId',
      reciver: 'otherUserId',
      message: "test",
    });
  };


  return (
    <div>
      otherid: {params.chat} my id: {userId} chat: {chat.participants[0]}
      {chat.participants[1]}
      <div className="mt-10 flex gap-5">
        <form action={handleSubmit}>
          <input
            className="outline-slate-400 outline-double"
            type="text"
            placeholder="message"
          />
          <button className="border-2 p-4" type="submit">
            send.
          </button>
        </form>
      </div>
    </div>
  );
}
