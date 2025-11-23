import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class merging, or just remove 'cn' and use template strings

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  [key: string]: any;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full overflow-hidden [--gap:1rem] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] animate-scroll flex-row",
          pauseOnHover && "hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
