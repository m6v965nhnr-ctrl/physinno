import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画面（ブラウザ）が、いま動いているバージョンを知るための印。/api/version と比べて、古くなっていれば更新を案内する
  env: {
    NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA ?? "dev",
  },
};

export default nextConfig;
