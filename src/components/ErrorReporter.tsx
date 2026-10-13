"use client";

import { useEffect } from "react";
import { reportClientError } from "@/lib/errorReport";

// 画面で起きた、捕まえられていないエラーを、運営の画面（/admin）に集める
export default function ErrorReporter() {
  useEffect(() => {
    function onError(event: ErrorEvent) {
      reportClientError(event.error ?? event.message);
    }
    function onRejection(event: PromiseRejectionEvent) {
      reportClientError(event.reason, "unhandledrejection");
    }

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
