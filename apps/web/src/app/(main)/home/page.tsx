"use client";

import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  PostCard,
  UserAvatar,
  ProtectedRoute,
  useAppSelector,
} from "@/domains/application";
import { posts } from "@/features/feed/data/posts";

export default function HomePage() {
  const { user,token } = useAppSelector((state) => state.user);

  console.log("user,token ====>", user,token);
  return (
    <ProtectedRoute>
    <div
      className="
        mx-auto w-full max-w-[620px] space-y-5 px-3
        sm:space-y-7 sm:px-4 lg:px-0
      "
      >
        {/* Page Heading */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Home</h1>

          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Stay connected with your community.
          </p>
        </div>
      </div>

      {/* Create Post Section */}
      <Card>
        <CardContent
          className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4"
        >
          <UserAvatar
            name="Soniya Patidar"
            className="h-9 w-9 shrink-0 sm:h-11 sm:w-11"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium sm:text-sm">
              What's on your mind?
            </p>

            <p className="hidden text-xs text-muted-foreground sm:block">
              Share your thoughts with everyone.
            </p>
          </div>

        <Button
  size="sm"
  className="shrink-0 text-xs sm:text-sm"
  render={<Link href="/profile" />}
>
  View Profile
</Button>
        </CardContent>
      </Card>

      {/* Posts Section */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold sm:text-lg">
            Latest Posts
          </h2>

            <Button variant="ghost" size="sm">
              Recent
            </Button>
          </div>

        {/* Post List */}
        <div className="space-y-4 sm:space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              username={post.username}
              name={post.name}
              caption={post.caption}
              time={post.time}
              likes={post.likes}
              comments={post.comments}
              image={post.image}
            />
          ))}
        </div>
      </section>
    </div>

    </ProtectedRoute>
  );
}
