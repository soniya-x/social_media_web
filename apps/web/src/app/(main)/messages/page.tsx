
"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Phone,
  Video,
  ArrowLeft,
} from "lucide-react";

import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";

const conversations = [
  {
    id: 1,
    name: "Rahul Sharma",
    username: "rahul_dev",
    lastMessage: "Hey! How are you?",
    time: "2m",
  },
  {
    id: 2,
    name: "Priya Verma",
    username: "priya_01",
    lastMessage: "Let's connect tomorrow.",
    time: "10m",
  },
  {
    id: 3,
    name: "Aman Patel",
    username: "aman_design",
    lastMessage: "Thank you!",
    time: "1h",
  },
];

const sampleMessages = [
  {
    id: 1,
    text: "Hey! How are you?",
    sender: "other",
  },
  {
    id: 2,
    text: "I'm good. What about you?",
    sender: "me",
  },
  {
    id: 3,
    text: "I'm also doing great!",
    sender: "other",
  },
];

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="mx-auto flex h-[calc(100dvh-48px)] min-h-[450px] max-w-[1100px] overflow-hidden rounded-lg border">

      {/* Conversation List */}
      <div
        className={`
          w-full shrink-0 flex-col
          md:flex md:w-[300px]
          lg:w-[350px]
          border-r
          ${showChat ? "hidden" : "flex"}
        `}
      >
        {/* Header */}
        <div className="border-b p-4 sm:p-5">
          <h1 className="text-xl font-bold">Messages</h1>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted px-3">
            <Search
              size={18}
              className="shrink-0 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search conversations"
              className="h-10 min-w-0 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Conversation Items */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3">
          <h2 className="mb-3 px-2 text-sm font-semibold">
            Messages
          </h2>

          {conversations.map((user) => (
            <button
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                setShowChat(true);
              }}
              className={`
                flex w-full items-center gap-3
                rounded-lg p-3 text-left
                transition-colors
                ${
                  selectedUser.id === user.id
                    ? "bg-muted"
                    : "hover:bg-muted/60"
                }
              `}
            >
              <UserAvatar
                name={user.name}
                className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {user.name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {user.lastMessage}
                </p>
              </div>

              <span className="shrink-0 text-xs text-muted-foreground">
                {user.time}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`
          min-w-0 flex-1 flex-col
          ${showChat ? "flex" : "hidden md:flex"}
        `}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between gap-2 border-b p-3 sm:p-4">

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">

            {/* Back Button: Mobile Only */}
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 md:hidden"
              onClick={() => setShowChat(false)}
              aria-label="Back to conversations"
            >
              <ArrowLeft size={20} />
            </Button>

            <UserAvatar
              name={selectedUser.name}
              className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {selectedUser.name}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                @{selectedUser.username}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-1 sm:gap-2">
            <Button variant="ghost" size="icon">
              <Phone size={18} />
            </Button>

            <Button variant="ghost" size="icon">
              <Video size={18} />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3 sm:gap-4 sm:p-5">
          {sampleMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[85%] break-words rounded-2xl
                  px-3 py-2 text-sm
                  sm:max-w-[70%] sm:px-4 sm:py-3
                  ${
                    msg.sender === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!message.trim()) return;

              console.log("New message:", message);
              setMessage("");
            }}
            className="flex items-center gap-2 rounded-full border px-3 sm:gap-3 sm:px-4"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none sm:h-12"
            />

            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={!message.trim()}
              className="shrink-0"
              aria-label="Send message"
            >
              <Send size={19} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
