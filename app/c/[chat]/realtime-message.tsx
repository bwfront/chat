'use client'
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";

type Message = {
    id: any;
    message: any;
    sender: any;
    reciver: any;
    chatid: any;
};

export default function RealtimeMessages({loadmessages}: {loadmessages: Message[]}) {
    const [messages, setMessages] = useState(loadmessages)
    useEffect(() => {
       const channel = supabase.channel('realtime messages').on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'messages',
        }, (payload) => {
           setMessages([...messages, payload.new] as Message[])
        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, messages, setMessages])

    return (
        <div className="flex flex-col gap-2 w-full">
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
