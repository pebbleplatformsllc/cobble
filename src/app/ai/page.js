import { Suspense } from "react";
import AIClient from "./ai-client";
import { BentoGridSkeleton } from "@/components/ui/skeletons";

export default function PeopleSociety() {
  return (
    <Suspense fallback={<BentoGridSkeleton />}>
      <AIClient />
    </Suspense>
  );
}