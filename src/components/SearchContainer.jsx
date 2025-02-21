"use client";

import React, { useState, useEffect, useRef } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AuroraText } from "@/components/ui/aurora-text";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { AnimatePresence } from "framer-motion";
import { useSearchStore } from "@/lib/store";
import { IconSparkles, IconSearch } from "@tabler/icons-react";

const searchPlaceholders = [
  "Enter a city, state (e.g. Seattle, WA)",
  "Enter a ZIP code (e.g. 98101)",
  "Enter a city, state, ZIP (e.g. Miami, FL 33101)",
  "Enter a state (e.g. California)",
  "Enter a county (e.g. King County, WA)",
];

const aiSearchPlaceholders = [
  "What are the demographic trends in urban areas over the last decade?",
  "Compare employment rates across different age groups and education levels",
  "How has housing affordability changed in major metropolitan areas?",
  "What is the correlation between education levels and income?",
  "Analyze healthcare access disparities across different regions",
];

const exampleSearches = [
  {
    query: "Compare median household income between Seattle, WA and Austin, TX over the past 5 years",
    icon: "💰",
    category: "Economic Analysis"
  },
  {
    query: "Analyze the relationship between education level and employment rate in Boston, MA metropolitan area",
    icon: "📚",
    category: "Education & Work"
  },
  {
    query: "Compare population growth between Denver, CO suburbs and downtown areas since 2020",
    icon: "📊",
    category: "Demographics"
  },
  {
    query: "Examine healthcare access changes in rural Mississippi communities from 2018-2023",
    icon: "🏥",
    category: "Healthcare"
  },
  {
    query: "Analyze housing affordability trends in Miami-Dade County, FL from 2019 to present",
    icon: "🏘️",
    category: "Housing"
  }
];

const features = [
  {
    title: "People & Society",
    description: "Population and Demographics, Migration and Geographic Mobility",
    icon: "👥",
    color: "bg-indigo-500/5 dark:bg-indigo-500/10",
    href: "/people-society"
  },
  {
    title: "Economy & Workforce",
    description: "Income and Earnings, Labor Force and Employment",
    icon: "📈",
    color: "bg-indigo-500/5 dark:bg-indigo-500/10",
    href: "/economy-workforce"
  },
  {
    title: "Housing & Real Estate",
    description: "Housing and Real Estate Data",
    icon: "🏘️",
    color: "bg-indigo-500/5 dark:bg-indigo-500/10",
    href: "/housing-real-estate"
  },
  {
    title: "Health & Well-being",
    description: "Healthcare and Public Health Data",
    icon: "🏥",
    color: "bg-indigo-500/5 dark:bg-indigo-500/10",
    href: "/health-wellbeing"
  },
  {
    title: "Infrastructure & Transportation",
    description: "Transportation and Infrastructure Data",
    icon: "🚗",
    color: "bg-indigo-500/5 dark:bg-indigo-500/10",
    href: "/infrastructure-transportation"
  }
];

export default function SearchContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isAiSearch, setIsAiSearch] = useState(false);
  const { setSearchQuery, setAiSearchQuery, setCurrentSearch, setAiCurrentSearch, setShowAiButton, subscriptionLevel } = useSearchStore();
  const inputRef = useRef(null);

  useEffect(() => {
    // Show content after initial mount
    setShowContent(true);
  }, []);

  const handleSearch = (e, value) => {
    e.preventDefault();
    setIsLoading(true);
    setShowContent(false);

    if (isAiSearch) {
      if (subscriptionLevel === "pro") {
        setAiSearchQuery(value);
        setAiCurrentSearch(value);
        setShowAiButton(true);
        setTimeout(() => {
          router.push("/ai");
        }, 3000);
      } else {
        router.push("/pricing");
      }
    } else {
      setSearchQuery(value);
      setCurrentSearch(value);
      setTimeout(() => {
        router.push("/people-society");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start pt-8 min-h-[calc(100vh-10rem)]">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
        {showContent && !isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[95vw] mx-auto"
          >
            <div className="w-full max-w-[95%] sm:max-w-2xl space-y-6 sm:space-y-8 mx-auto">
              <div className="text-center space-y-4 relative z-10">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                  <AuroraText>Cobble</AuroraText>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-[95%] sm:max-w-lg mx-auto mb-4 sm:mb-8">
                  The best place to explore and analyze U.S. Census Bureau data
                </p>
              </div>
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                aiPlaceholders={aiSearchPlaceholders}
                isLoading={isLoading}
                ref={inputRef}
                onSubmit={handleSearch}
                className="relative z-10 bg-transparent"
                isAiMode={isAiSearch}
              />
              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    setIsAiSearch(!isAiSearch);
                    if (inputRef.current) {
                      inputRef.current.setValue("");
                    }
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors relative text-sm sm:text-base px-4 sm:px-0"
                >
                  {isAiSearch ? (
                    <IconSearch className="mr-2 inline-block w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <IconSparkles className="mr-2 inline-block w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  )}
                  <span>{isAiSearch ? "Switch back to " : "Want more specific results? Try our "}</span>
                  <motion.span
                    key={isAiSearch ? "simple" : "ai"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-block"
                  >
                    <AuroraText>{isAiSearch ? "normal search" : "advanced AI search"}</AuroraText>
                  </motion.span>
                </button>
              </div>
              {!isAiSearch && (
                <div className="relative mt-8 sm:mt-16 w-full max-w-[95vw] mx-auto overflow-hidden">
                  <Marquee className="[--duration:30s]">
                    {features.map((feature) => (
                      <div
                        onClick={() => router.push(feature.href)}
                        key={feature.title}
                        className="mx-2 sm:mx-4 w-[280px] sm:w-80 p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-colors duration-200 bg-white/50 dark:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{feature.icon}</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                            {feature.title}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </Marquee>
                </div>
              )}
              {isAiSearch && (
                <div className="relative mt-8 sm:mt-16 w-full max-w-[95vw] mx-auto overflow-hidden">
                  <Marquee className="[--duration:40s]">
                    {exampleSearches.map((search) => (
                      <div
                        key={search.query}
                        onClick={() => inputRef.current?.setValue(search.query)}
                        className="mx-2 sm:mx-4 w-[280px] sm:w-80 p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-colors duration-200 bg-white/50 dark:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{search.icon}</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                            {search.category}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                          {search.query}
                        </p>
                      </div>
                    ))}
                  </Marquee>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}