"use client";

import { useParams } from "next/navigation";
import PortfolioView from "@/components/PortfolioView";

export default function PortfolioViewPage() {
  const params = useParams();
  return <PortfolioView id={params.id as string} />;
}
