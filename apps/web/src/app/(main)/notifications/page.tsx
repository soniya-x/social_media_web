"use client";

import { useState } from "react";
import {
  Heart,
  UserPlus,
  MessageCircle,
  AtSign,
  CheckCheck,
} from "lucide-react";

import { Button,UserAvatar } from "$domains/application";

import { notifications as initialNotifications } from "@/features/notifications/data/notifications";

type FilterType = "all" | "unread";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const [notificationList, setNotificationList] =
    useState(initialNotifications);

  const filteredNotifications =
    filter === "unread"
      ? notificationList.filter((item) => !item.read)
      : notificationList;

  const markAllAsRead = () => {
    setNotificationList((previous) =>
      previous.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="text-red-500" />;

      case "follow":
        return <UserPlus size={16} className="text-blue-500" />;

      case "comment":
        return <MessageCircle size={16} className="text-green-500" />;

      case "mention":
        return <AtSign size={16} className="text-purple-500" />;

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-[750px] space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">
            Notifications
          </h1>

          <p className="text-sm text-muted-foreground">
            Stay updated with your activities.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={markAllAsRead}
        >
          <CheckCheck size={16} />
          Mark all as read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 border-b pb-3">
        <Button
          variant={filter === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>

        <Button
          variant={filter === "unread" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("unread")}
        >
          Unread
        </Button>
      </div>

      {/* Notification List */}
      <div className="space-y-2">

        {filteredNotifications.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-medium">
              No unread notifications
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              You're all caught up!
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                item.read
                  ? "hover:bg-muted/50"
                  : "bg-muted/70 hover:bg-muted"
              }`}
            >
              {/* Avatar */}
              <UserAvatar
                name={item.name}
                className="h-11 w-11 shrink-0"
              />

              {/* Notification Details */}
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-semibold">
                    {item.name}
                  </span>{" "}
                  {item.message}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.time}
                </p>
              </div>

              {/* Activity Icon */}
              <div className="flex shrink-0 items-center gap-3">
                {getIcon(item.type)}

                {!item.read && (
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                )}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}