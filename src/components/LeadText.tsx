// 「病型の三つ。本文…」のように短い見出しで始まる文は、見出しを太字にして改行する（頭に入りやすくする）
export default function LeadText({ t }: { t: string }) {
  const i = t.indexOf("。");
  // 文の途中（は・が・読点を含む）は見出しではないので、そのまま出す
  if (i < 0 || i > 14 || i === t.length - 1 || /[はが、,]/.test(t.slice(0, i))) return <>{t}</>;
  return (
    <>
      <span className="font-semibold text-gray-900">{t.slice(0, i + 1)}</span>
      <br />
      {t.slice(i + 1)}
    </>
  );
}
