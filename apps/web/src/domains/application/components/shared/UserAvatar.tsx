import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "$domains/application";

interface UserAvatarProps {
  name: string;
  image?: string;
  className?: string;
}

export function UserAvatar({
  name,
  image,
  className,
}: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar className={className}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}