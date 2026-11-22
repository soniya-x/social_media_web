import Image from "next/image";

import { ProfileHeader } from "@/domains/application";

import { profilePosts } from "@/features/profile/data/profilePost";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[850px] space-y-8">

      {/* Profile Information */}
      <ProfileHeader
        name="Soniya Patidar"
        username="soniya"
        bio="Frontend Developer | Learning and building"
        posts={6}
        followers={1250}
        following={350}
      />

      {/* Profile Navigation */}
      <div className="flex justify-center gap-12 border-b">
        <button className="border-t-2 border-foreground px-4 py-4 text-sm font-semibold">
          POSTS
        </button>

        <button className="px-4 py-4 text-sm text-muted-foreground">
          SAVED
        </button>

        <button className="px-4 py-4 text-sm text-muted-foreground">
          TAGGED
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-4">
        {profilePosts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src={post.image}
              alt="Profile post"
              fill
              unoptimized
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 640px) 33vw, 250px"
            />
          </div>
        ))}
      </div>

    </div>
  );
}