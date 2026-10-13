"use client";

import { createContext, useContext } from "react";
import type { Hospital } from "@/lib/hospitals";

// サーバー（layout）で取得した病院の基本情報を、画面（クライアント）の最初の表示に使う。
// これで、最初のHTMLに病院名・住所・診療科などが入り、検索エンジンにも読まれる。
// 表示のあとは、画面側が、従来どおり最新のデータを取得して置き換える。
const HospitalInitialContext = createContext<Hospital | null>(null);

export function HospitalInitialProvider({ hospital, children }: { hospital: Hospital | null; children: React.ReactNode }) {
  return <HospitalInitialContext.Provider value={hospital}>{children}</HospitalInitialContext.Provider>;
}

export function useHospitalInitial(): Hospital | null {
  return useContext(HospitalInitialContext);
}
