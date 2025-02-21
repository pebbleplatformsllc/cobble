import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Marquee = ({
  children,
  pauseOnHover = false,
  className,
  ...props
}) => {
  return (
    <div className={cn("group flex overflow-hidden", className)} {...props}>
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex shrink-0"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex shrink-0"
      >
        {children}
      </motion.div>
    </div>
  );
};