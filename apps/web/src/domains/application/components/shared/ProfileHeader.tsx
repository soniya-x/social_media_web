
import { Button,UserAvatar } from "@/domains/application";

interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
}

export function ProfileHeader({
  name,
  username,
  bio,
  posts,
  followers,
  following,
}: ProfileHeaderProps) {
  return (
    <div className="
      flex flex-col
      gap-5
      border-b
      pb-6
      sm:gap-7
      sm:pb-8
      md:flex-row
      md:items-start
      md:gap-10
      lg:gap-12
    ">

      {/* Profile Picture */}
      <div className="flex justify-center md:justify-start">
        <UserAvatar
          name={name}
          className="
            h-24 w-24
            text-xl
            sm:h-28 sm:w-28
            md:h-32 md:w-32
            md:text-2xl
          "
        />
      </div>

      {/* Profile Information */}
      <div className="min-w-0 flex-1 space-y-5">

        {/* Username and Edit Button */}
        <div className="
          flex flex-col
          items-center
          gap-3
          sm:flex-row
          sm:justify-center
          md:justify-start
        ">
          <h1 className="text-lg font-semibold sm:text-xl">
            {username}
          </h1>

          <Button size="sm" className="w-full sm:w-auto">
            Edit Profile
          </Button>
        </div>

        {/* Profile Statistics */}
        <div className="
          flex items-center
          justify-center
          gap-5
          text-center
          text-xs
          sm:justify-center
          sm:gap-8
          sm:text-sm
          md:justify-start
        ">
          <p>
            <strong className="block sm:inline">{posts}</strong>{" "}
            posts
          </p>

          <p>
            <strong className="block sm:inline">
              {followers.toLocaleString()}
            </strong>{" "}
            followers
          </p>

          <p>
            <strong className="block sm:inline">
              {following.toLocaleString()}
            </strong>{" "}
            following
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-sm font-semibold sm:text-base">
            {name}
          </h2>

          <p className="break-words text-xs text-muted-foreground sm:text-sm">
            {bio}
          </p>
        </div>

      </div>
    </div>
  );
}
