"use client";

import React, { useCallback, useEffect, useRef, useState, useImperativeHandle } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PlaceholdersAndVanishInput = React.forwardRef(({
  placeholders,
  aiPlaceholders,
  isLoading = false,
  initialValue = "",
  onChange,
  onSubmit,
  isAiMode = false
}, ref) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [currentAiPlaceholder, setCurrentAiPlaceholder] = useState(0);

  const intervalRef = useRef(null);
  const aiIntervalRef = useRef(null);

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    
    aiIntervalRef.current = setInterval(() => {
      setCurrentAiPlaceholder((prev) => (prev + 1) % aiPlaceholders.length);
    }, 4000);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      clearInterval(aiIntervalRef.current);
      intervalRef.current = null;
      aiIntervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        clearInterval(aiIntervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders, aiPlaceholders]);

  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [animating, setAnimating] = useState(false);
  
  // Expose setValue method to parent
  useImperativeHandle(ref, () => ({
    setValue: (newValue) => {
      setValue(newValue);
    }
  }));

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit(e);
    }
  };

  const vanishAndSubmit = (e) => {
    const value = inputRef.current?.value || "";
    onSubmit && onSubmit(e, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    vanishAndSubmit(e);
  };

  return (
    <form
      className={cn(
        "w-full max-w-[95%] relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0,0,0,0.1),0_1px_2px_-1px_rgb(0,0,0,0.1)] dark:shadow-[0_1px_3px_0_rgb(0,0,0,0.4),0_1px_2px_-1px_rgb(0,0,0,0.4)] transition-all duration-300 rounded-xl",
        isAiMode ? "min-h-[8rem] h-auto" : "h-12",
        value && "bg-gray-50/50 dark:bg-gray-800/50"
      )}
      onSubmit={handleSubmit}>
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
          isAiMode ? "top-[20%]" : "top-1/2 -translate-y-1/4",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef} />
      {isAiMode ? (
        <textarea
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
              onChange && onChange(e);
              // Adjust height
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={value}
          className={cn(
            "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black focus:outline-none focus:ring-0 pl-4 pr-20 rounded-xl block overflow-hidden",
            "pt-4 pb-12 min-h-[8rem] px-3 sm:px-4",
            "resize-none placeholder:text-neutral-500 dark:placeholder:text-zinc-500 whitespace-pre-wrap",
            animating && "text-transparent dark:text-transparent"
          )}
          placeholder=""
          style={{ 
            wordWrap: 'break-word',
            height: 'auto',
            minHeight: '8rem'
          }}
        />
      ) : (
        <input
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
              onChange && onChange(e);
            }
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={value}
          type="text"
          className={cn(
            "w-full h-12 relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black focus:outline-none focus:ring-0 pl-4 pr-16 sm:pr-20 rounded-xl",
            animating && "text-transparent dark:text-transparent"
          )}
          placeholder=""
        />
      )}
      <button
        disabled={!value || isLoading}
        type="submit"
        className={cn(
          "absolute right-2 z-50 h-8 w-8 rounded-full disabled:bg-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-zinc-800 transition duration-200 grid place-items-center",
          isAiMode ? "bottom-2" : "top-1/2 -translate-y-1/2"
        )}>
        {isLoading ? (
          <div className="h-4 w-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        ) : (
          <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white h-4 w-4 -translate-x-[1px]">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: "50%",
              strokeDashoffset: "50%",
            }}
            animate={{
              strokeDashoffset: value ? 0 : "50%",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }} />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
        )}
      </button>
      <div
        className={cn(
          "absolute inset-0 flex items-center pointer-events-none",
          "rounded-xl overflow-hidden",
          isAiMode ? "items-start pt-4" : "items-center"
        )}>
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${isAiMode ? currentAiPlaceholder : currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className={cn(
                "dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 text-left w-[calc(100%-2rem)] pointer-events-none",
                isAiMode ? "whitespace-pre-wrap break-words pr-4 leading-relaxed" : "truncate"
              )}>
              {isAiMode ? aiPlaceholders[currentAiPlaceholder] : placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
});

PlaceholdersAndVanishInput.displayName = "PlaceholdersAndVanishInput";

export { PlaceholdersAndVanishInput };