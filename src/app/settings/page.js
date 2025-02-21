import { Suspense } from "react";
import SettingsClient from "./settings-client";
import Loading from "./loading";

export default function Settings() {
  return (
    <Suspense fallback={<Loading />}>
      <SettingsClient />
    </Suspense>
  );
}