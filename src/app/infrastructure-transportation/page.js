import { Suspense } from "react";
import InfrastructureTransportationClient from "./infrastructure-transporation-client";
import { BentoGridSkeleton } from "@/components/ui/skeletons";

export default function PeopleSociety() {
  return (
    <Suspense fallback={<BentoGridSkeleton />}>
      <InfrastructureTransportationClient />
    </Suspense>
  );
}