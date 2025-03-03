import { Suspense } from "react";
import SearchContainer from "@/components/SearchContainer";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchContainer />
    </Suspense>
  );
}