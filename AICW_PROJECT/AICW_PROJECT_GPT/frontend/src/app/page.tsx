"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "무엇을 도와드릴까요?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE + "/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      }
    );
    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  }

  async function continueWithClaude() {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE + "/continue/claude",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      }
    );
    const data = await res.json();
    alert("Claude says:\n\n" + data.reply);
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] rounded-2xl p-3 ${
              m.role === "user"
                ? "bg-blue-600 self-end"
                : "bg-gray-700 self-start"
            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-gray-800 rounded-lg px-3 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={send}
          className="bg-green-600 rounded-lg px-4 text-white"
        >
          Send
        </button>
        <button
          onClick={continueWithClaude}
          className="text-xs underline text-gray-300"
        >
          Continue with Claude
        </button>
      </div>
    </div>
  );
}
