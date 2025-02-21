import { Suspense } from "react";
import EconomyWorkforceClient from "./economy-workforce-client";
import { BentoGridSkeleton } from "@/components/ui/skeletons";

export default function PeopleSociety() {
  return (
    <Suspense fallback={<BentoGridSkeleton />}>
      <EconomyWorkforceClient />
    </Suspense>
  );
}