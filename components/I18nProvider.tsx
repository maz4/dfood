"use client";

import { useEffect } from "react";

// Initialize i18n on client side
if (typeof window !== "undefined") {
  require("@/lib/i18n");
}

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
