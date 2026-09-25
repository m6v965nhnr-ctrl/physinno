import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // ユーザーがアップロードした画像（Supabase Storage の公開URL）を表示するため、
      // next/image の最適化対象（remotePatterns・変換コスト）にはしていない
      "@next/next/no-img-element": "off",
      // マウント時にデータを取得する既存の実装（useEffect → 非同期関数）を許容する。
      // Server Components / SWR への移行時に解消する
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
