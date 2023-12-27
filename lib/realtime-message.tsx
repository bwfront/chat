"use client";
import supabase from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
type Message = {
  id: any;
  message: any;
  sender: any;
  reciver: any;
  chatid: any;
  created_at: any;
};

export default function RealtimeMessages({
  loadmessages,
  userid,
}: {
  loadmessages: Message[];
  userid?: string;
}) {
  const [messages, setMessages] = useState(loadmessages);
  const user_id = userid ?? "";
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current as HTMLDivElement;
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages([...messages, payload.new] as Message[]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, messages, setMessages]);

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const formattedDate = date.toISOString().substring(0, 10);
    return `${formattedDate}`;
  }

  function formatTime(isoDate: string) {
    const date = new Date(isoDate);
    const formattedTime = date.toLocaleTimeString().substring(0, 5);
    return `${formattedTime}`;
  }

  function checkSender(sender: string) {
    if (sender === user_id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-2 w-full px-16 overflow-y-scroll"
    >
      {messages.map((element: any) => {
        return (
          <div className="w-full" key={element.id}>
            {checkSender(element.sender) ? (
              <div className="flex justify-end">
                <div>
                  <div className="font-bold text-end">you</div>
                  <div>{element.message}</div>
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div>
                  <div className="font-bold text-start">other</div>
                  <div>{element.message}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
