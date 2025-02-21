import { Suspense } from "react";
import HealthWellbeingClient from "./health-wellbeing-client";
import { BentoGridSkeleton } from "@/components/ui/skeletons";

export default function PeopleSociety() {
  return (
    <Suspense fallback={<BentoGridSkeleton />}>
      <HealthWellbeingClient />
    </Suspense>
  );
}