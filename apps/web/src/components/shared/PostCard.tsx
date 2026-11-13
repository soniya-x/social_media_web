
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/shared/UserAvatar";

interface PostCardProps {
  username: string;
  name: string;
  caption: string;
  time: string;
  likes: number;
  comments: number;
  image: string;
}

export default function PostCard({
  username,
  name,
  caption,
  time,
  likes,
  comments,
  image,
}: PostCardProps) {
  return (
    <Card className="w-full overflow-hidden border shadow-sm">

      {/* Post Header */}
      <CardHeader className="
        flex flex-row items-center
        gap-2
        p-3
        sm:gap-3
        sm:p-4
      ">
        <UserAvatar
          name={name}
          className="h-9 w-9 shrink-0 sm:h-11 sm:w-11"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold sm:text-sm">
            {name}
          </p>

          <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
            @{username} · {time}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
          aria-label="More post options"
        >
          <MoreHorizontal size={20} />
        </Button>
      </CardHeader>

      {/* Post Image */}
      <CardContent className="p-0">
        <img
          src={image}
          alt={`Post shared by ${name}`}
          className="
            block
            max-h-[550px]
            min-h-[220px]
            w-full
            object-cover
            sm:min-h-[300px]
          "
        />
      </CardContent>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-2 pt-2 sm:px-3 sm:pt-3">

        <div className="flex items-center gap-0 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
            aria-label="Like post"
          >
            <Heart className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
            aria-label="Comment on post"
          >
            <MessageCircle className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
            aria-label="Share post"
          >
            <Send className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 sm:h-10 sm:w-10"
          aria-label="Save post"
        >
          <Bookmark className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </Button>
      </div>

      {/* Post Details */}
      <div className="space-y-2 px-3 pb-3 sm:px-4 sm:pb-4">

        <p className="text-xs font-semibold sm:text-sm">
          {likes.toLocaleString()} likes
        </p>

        <p className="break-words text-xs sm:text-sm">
          <span className="mr-2 font-semibold">
            {username}
          </span>
          {caption}
        </p>

        <p className="cursor-pointer text-xs text-muted-foreground sm:text-sm">
          View all {comments} comments
        </p>

      </div>
    </Card>
  );
}
