import { Suspense } from "react";
import HousingRealEstateClient from "./housing-real-estate-client";
import { BentoGridSkeleton } from "@/components/ui/skeletons";

export default function PeopleSociety() {
  return (
    <Suspense fallback={<BentoGridSkeleton />}>
      <HousingRealEstateClient />
    </Suspense>
  );
}