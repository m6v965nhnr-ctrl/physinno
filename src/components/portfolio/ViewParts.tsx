"use client";

// ポートフォリオを大きな流れ（経歴→資格・専門性→臨床実績→学術活動→
// 教育・組織への貢献→今後の目標）で読めるようにする見出しブロック
export function MacroSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 print:mt-5 print:break-before-auto">
      <div className="flex items-baseline gap-2 border-b-2 border-relight pb-2 print:pb-1 print:break-after-avoid">
        <span className="text-sm font-semibold text-relight-blue">
          {number}
        </span>
        <h2 className="text-xl font-bold text-gray-900 print:text-base">
          {title}
        </h2>
      </div>

      <div className="mt-4 space-y-6 print:mt-2 print:space-y-3">{children}</div>
    </section>
  );
}

export function SummaryTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white py-3 text-center print:rounded-none print:border-gray-300 print:py-1.5">
      <p className="text-lg font-semibold print:text-base">{value}</p>
      <p className="mt-1 text-xs text-gray-500 print:mt-0 print:text-gray-700">
        {label}
      </p>
    </div>
  );
}

export function PortfolioBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const items = Array.isArray(children)
    ? children.filter(Boolean)
    : children
    ? [children]
    : [];

  if (items.length === 0) return null;

  return (
    <section>
      <h3 className="text-base font-semibold text-gray-900 print:text-sm print:break-after-avoid">
        {title}
      </h3>

      <div className="mt-3 space-y-2 print:mt-1.5 print:space-y-1">
        {children}
      </div>
    </section>
  );
}

export function PrintEntry({
  title,
  subtitle,
  meta,
  description,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 print:rounded-none print:border-0 print:border-b print:border-gray-200 print:px-0 print:py-1 print:break-inside-avoid">
      <p className="text-sm font-medium text-gray-900 print:leading-snug">
        {title}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-500 print:mt-0.5 print:leading-snug print:text-gray-700">
          {subtitle}
        </p>
      )}
      {meta && (
        <p className="mt-1 text-xs text-gray-400 print:mt-0.5 print:leading-snug print:text-gray-600">
          {meta}
        </p>
      )}
      {description && (
        <p className="mt-1 whitespace-pre-wrap text-xs text-gray-600 print:mt-0.5 print:leading-snug print:text-gray-800">
          {description}
        </p>
      )}
    </div>
  );
}
