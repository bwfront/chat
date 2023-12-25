"use client";
import { XataClient, getXataClient } from "@/src/xata";
import React, { useEffect, useState } from "react";

type Message = {
  id: string;
  message: string;
};

export default function Messages(props: any) {
  const xataClient = new XataClient({ enableBrowser: true, apiKey: process.env.NEXT_PUBLIC_XATA_API_KEY });
  const [messages, setMessages] = useState<Message[]>([]);
  const chatid = props.id;


  //Chnage service
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chatMessages = await xataClient.db.messages
          .filter({
            chatid: chatid,
          })
          .getMany();

        const transformedMessages = chatMessages.map((msg) => ({
          id: msg.id || "",
          message: msg.message || "",
        }));

        setMessages(transformedMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages(); // Execute the function to fetch messages
  }, [chatid]); // Re-run when chatid changes

  return (
    <div className="flex flex-col gap-2">
      {messages.map((element: any) => {
        return (
          <div key={element.id}>
            <p>{element.message}</p>
          </div>
        );
      })}
    </div>
  );
}
