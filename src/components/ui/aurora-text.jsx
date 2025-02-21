import { cn } from "@/lib/utils";

export const AuroraText = ({ children, className }) => {
  return (
    <span
      className={cn(
        "relative inline-block bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-700 dark:from-indigo-400 dark:via-indigo-300 dark:to-indigo-200",
        "bg-clip-text text-transparent animate-[aurora_60s_linear_infinite]",
        className
      )}
    >
      {children}
    </span>
  );
};