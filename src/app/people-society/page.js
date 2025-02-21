import { Suspense } from "react";
import PeopleSocietyClient from "./people-society-client";
import { BentoGridSkeleton } from "@/components/ui/skeletons";

export default function PeopleSociety() {
  return (
    <Suspense fallback={<BentoGridSkeleton />}>
      <PeopleSocietyClient />
    </Suspense>
  );
}