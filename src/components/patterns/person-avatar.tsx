import { initialsOf } from "../../lib/initials.ts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";

/**
 * A person's avatar: their photo when there is one, their initials when
 * there is not (or while it loads).
 *
 * Every screen that shows a person goes through this, so a face is the same
 * face everywhere. Pass the user's `image` (better-auth's `user.image`).
 */
function PersonAvatar({
  name,
  email,
  image,
  initials,
  size,
  className,
}: {
  name: string;
  email?: string;
  /** The photo URL; absent means initials. */
  image?: string;
  /** Fallback initials, when the caller already has them. */
  initials?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Avatar size={size} className={className}>
      {image && <AvatarImage src={image} alt="" />}
      <AvatarFallback>{initials ?? initialsOf(name, email)}</AvatarFallback>
    </Avatar>
  );
}

export { PersonAvatar };
