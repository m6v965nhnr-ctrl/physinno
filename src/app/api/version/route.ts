// いま公開されているバージョン（コミットの印）。画面が古いままかどうかを確かめるために使う
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { id: process.env.VERCEL_GIT_COMMIT_SHA ?? "dev" },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
