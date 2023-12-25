import React from "react";
import { getXataClient } from "@/src/xata";
import { auth } from "@clerk/nextjs";
import Messages from "@/components/Messages";

const xataClient = getXataClient();

export default async function Page({ params }: { params: { chat: string } }) {
  const { userId } = auth();
  const otherUserId = params.chat;
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

  

  async function handleSubmit(data: FormData) {
    "use server";
    if (!data.get("message")) return;
    xataClient.db.messages.create({
      chatid: chat.id,
      message: String(data.get("message")),
      sender: userId,
      reciver: otherUserId,
    });
  }

  return (
    <div>
      <Messages id={chat.id} />
      <div className="mt-10 flex gap-5">
        <form action={handleSubmit}>
          <input
            className="outline-slate-400 outline-double"
            type="text"
            placeholder="message"
            name="message"
          />
          <button className="border-2 p-4" type="submit">
            send.
          </button>
        </form>
      </div>
    </div>
  );
}
