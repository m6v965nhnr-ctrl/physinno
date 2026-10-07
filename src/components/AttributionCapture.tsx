"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

// 画面には何も出さない。どのページから入っても、リンクの ?utm_source= を覚えておく
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
