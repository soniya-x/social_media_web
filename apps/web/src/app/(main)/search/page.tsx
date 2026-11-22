
"use client";

import { useState } from "react";
import { Search, X, Clock } from "lucide-react";
import { UserAvatar } from "@/domains/application";


const recentUsers = [
  { name: "Rahul Sharma", username: "@rahul_dev" },
  { name: "Priya Verma", username: "@priya_01" },
  { name: "Aman Patel", username: "@aman_design" },
];

const users = [
  ...recentUsers,
  { name: "Sneha Gupta", username: "@sneha_gupta" },
  { name: "Rohit Jain", username: "@rohit_jain" },
  { name: "Anjali Singh", username: "@anjali_01" },
  { name: "Karan Mehta", username: "@karan_dev" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto min-h-screen w-full max-w-[650px] px-5 py-8">

      {/* Heading */}
      <h1 className="mb-2 text-2xl font-bold">
        Search
      </h1>

      <p className="mb-7 text-sm text-muted-foreground">
        Search for people on SocialGram.
      </p>

      {/* Search Input */}
      <div className="relative mb-8">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Search people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl bg-muted/60 py-3 pl-12 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results */}
      {searchQuery.trim() !== "" ? (
        <div className="space-y-5">

          <h2 className="text-base font-semibold">
            Results
          </h2>

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.username}
                className="flex items-center gap-3"
              >
                <UserAvatar
                  name={user.name}
                  className="h-11 w-11"
                />

                <div>
                  <p className="text-sm font-semibold">
                    {user.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {user.username}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No users found.
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Recent Section */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold">
                Recent
              </h2>

              <button className="text-sm font-semibold text-primary">
                Clear all
              </button>
            </div>

            <div className="space-y-5">
              {recentUsers.map((user) => (
                <div
                  key={user.username}
                  className="flex items-center gap-3"
                >
                  <UserAvatar
                    name={user.name}
                    className="h-11 w-11"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      {user.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.username}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Remove recent search"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Empty Search State */}
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border">
              <Clock
                size={28}
                className="text-muted-foreground"
              />
            </div>

            <h3 className="text-sm font-semibold">
              Search for people
            </h3>

            <p className="mt-2 max-w-[250px] text-xs text-muted-foreground">
              Find your friends and discover new people on SocialGram.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
