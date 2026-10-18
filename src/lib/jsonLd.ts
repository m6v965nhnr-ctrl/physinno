// 構造化データ（JSON-LD）を、<script> に入れる文字列にする。
// 配列のまま出すと、一部のアプリ内ブラウザ・拡張機能が、「各要素の @context」を読もうとして、エラーを出す。
// そのため、複数あるときは、1つの @graph にまとめる。"<" は、<script> から抜け出せないように、エスケープする。
type Ld = Record<string, unknown>;

export function ldJson(data: Ld | Ld[]): string {
  const body: Ld =
    Array.isArray(data)
      ? { "@context": "https://schema.org", "@graph": data.map((item) => {
        const rest = { ...item };
        delete rest["@context"];
        return rest;
      }) }
      : data;
  return JSON.stringify(body).replace(/</g, "\\u003c");
}
