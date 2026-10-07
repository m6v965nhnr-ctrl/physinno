// トップページ用の、アプリの画面の見本（コードで描いた、操作できない画像）。
// 実際の画面と同じ色・形をそろえてあるが、内容は例。スクリーンリーダーには、説明文だけを伝える（aria-hidden）

function Phone({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="mx-auto w-[236px] shrink-0">
      <div aria-hidden="true" className="rounded-[2rem] border-[6px] border-gray-800 bg-white p-0 shadow-xl">
        <div className="mx-auto mt-1 h-1.5 w-14 rounded-full bg-gray-200" />
        <div className="h-[392px] overflow-hidden rounded-b-[1.5rem] px-3 pb-3 pt-2 text-left">{children}</div>
      </div>
      <figcaption className="mt-3 text-center text-xs font-medium text-gray-600">{label}</figcaption>
    </figure>
  );
}

const chip = (on: boolean) =>
  `rounded-full border px-2 py-0.5 text-[9px] ${on ? "border-brand-700 bg-brand-700 text-white" : "border-brand-200 bg-white text-brand-800"}`;

export function MockPaperSearch() {
  return (
    <Phone label="論文検索：9サイトを一度に・エビデンスレベルで絞り込み">
      <p className="text-[11px] font-bold text-gray-900">論文を探す</p>
      <div className="mt-1.5 rounded-full border border-gray-300 px-3 py-1.5 text-[10px] text-gray-500">変形性膝関節症 運動療法</div>
      <div className="mt-2 flex flex-wrap gap-1">
        <span className={chip(true)}>II RCT</span>
        <span className={chip(true)}>I SR・メタ解析</span>
        <span className={chip(false)}>IVa コホート</span>
        <span className={chip(false)}>V 症例報告</span>
      </div>
      <div className="mt-2 flex gap-1 text-[9px]">
        <span className="rounded-full bg-gray-900 px-2 py-0.5 text-white">引用数が多い順</span>
        <span className="rounded-full border border-gray-200 px-2 py-0.5 text-gray-600">新しい順</span>
      </div>
      {[
        ["PubMed", "レベルI・SR・メタ解析", "引用 1,284", "Exercise therapy for knee osteoarthritis: a systematic review"],
        ["Europe PMC", "レベルII・RCT", "引用 312", "Home-based quadriceps training: a randomized trial"],
        ["J-STAGE", "", "", "変形性膝関節症に対する運動療法の検討"],
      ].map(([src, lv, cite, title]) => (
        <div key={title} className="mt-2 rounded-xl border border-gray-200 p-2">
          <div className="flex flex-wrap items-center gap-1">
            <span className="rounded-full bg-gray-100 px-1.5 py-px text-[8px] text-gray-600">{src}</span>
            {lv && <span className="rounded-full bg-sky-100 px-1.5 py-px text-[8px] font-semibold text-sky-800">{lv}</span>}
            {cite && <span className="rounded-full bg-gray-100 px-1.5 py-px text-[8px] text-gray-600">{cite}</span>}
          </div>
          <p className="mt-1 text-[10px] font-semibold leading-snug text-gray-900">{title}</p>
        </div>
      ))}
    </Phone>
  );
}

export function MockIdeas() {
  return (
    <Phone label="臨床アイデア：疾患ごとの評価とリハビリのアイデア">
      <p className="text-[11px] font-bold text-gray-900">臨床アイデア</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <div className="rounded-xl bg-relight-gradient px-2 py-1.5 text-[9px] font-bold">✨ AIに相談</div>
        <div className="rounded-xl border border-gray-200 px-2 py-1.5 text-[9px] font-bold text-gray-900">🔖 マイ臨床アイデア</div>
      </div>
      <div className="mt-2 rounded-xl border border-gray-200 p-2">
        <p className="text-[9px] font-semibold text-gray-500">① 分類（診療報酬の区分）</p>
        <div className="mt-1 rounded-lg border border-gray-300 px-2 py-1 text-[10px] text-gray-900">運動器リハビリテーション ▾</div>
        <p className="mt-1.5 text-[9px] font-semibold text-gray-500">② 疾患</p>
        <div className="mt-1 rounded-lg border border-gray-300 px-2 py-1 text-[10px] text-gray-900">変形性膝関節症 ▾</div>
      </div>
      <p className="mt-2 text-[10px] font-bold text-gray-900">変形性膝関節症</p>
      <p className="mt-1 text-[9px] font-semibold text-gray-500">まず見たい評価</p>
      {["疼痛（NRS）", "膝の伸展制限", "大腿四頭筋・股関節外転筋の筋力", "歩行・階段"].map((e) => (
        <p key={e} className="mt-0.5 border-b border-gray-100 py-0.5 text-[9px] text-gray-800">{e}</p>
      ))}
      <p className="mt-2 text-[9px] font-semibold text-gray-500">リハビリのアイデア</p>
      <div className="mt-1 rounded-lg border border-gray-200 px-2 py-1 text-[9px] font-semibold text-gray-900">大腿四頭筋の筋力訓練 ▾</div>
    </Phone>
  );
}

export function MockKokushi() {
  return (
    <Phone label="国試の過去問：全1,000問・正答つき・解説・模擬試験">
      <p className="text-[9px] text-gray-500">第61回 午前 15 ・ 運動学</p>
      <p className="mt-1 text-[10px] font-semibold leading-snug text-gray-900">
        歩行周期の立脚中期に、最も活動する筋はどれか。
      </p>
      {[
        ["1", "大殿筋", false],
        ["2", "中殿筋", true],
        ["3", "腸腰筋", false],
        ["4", "前脛骨筋", false],
        ["5", "ハムストリングス", false],
      ].map(([n, t, ok]) => (
        <div
          key={String(n)}
          className={`mt-1.5 flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[10px] ${
            ok ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-gray-200 text-gray-800"
          }`}
        >
          <span className="font-bold">{n}</span>
          {t}
        </div>
      ))}
      <div className="mt-2 rounded-xl bg-emerald-50 px-2 py-1.5 text-[10px] font-bold text-emerald-900">正解！</div>
      <div className="mt-1.5 rounded-xl border border-gray-200 px-2 py-1.5 text-[9px] leading-snug text-gray-700">
        <b className="text-gray-900">解説</b>　立脚中期は、骨盤を水平に保つために、中殿筋が働きます…
      </div>
    </Phone>
  );
}

export function MockHospital() {
  const items: [string, number][] = [
    ["教育体制", 4.2],
    ["残業の少なさ", 3.4],
    ["給与", 3.1],
    ["人間関係", 4.5],
    ["有給の取りやすさ", 3.8],
    ["学べる環境", 4.6],
  ];
  return (
    <Phone label="病院を探す：約5,000病院と、PTの職場口コミ">
      <p className="text-[11px] font-bold text-gray-900">病院を探す</p>
      <div className="mt-1.5 grid grid-cols-2 gap-1">
        <div className="rounded-lg border border-gray-300 px-2 py-1 text-[9px] text-gray-800">東京都 ▾</div>
        <div className="rounded-lg border border-gray-300 px-2 py-1 text-[9px] text-gray-800">リハビリ科あり ▾</div>
      </div>
      <div className="mt-2 rounded-xl border border-gray-200 p-2">
        <p className="text-[10px] font-bold text-gray-900">○○リハビリテーション病院</p>
        <p className="text-[9px] text-gray-500">回復期・脳血管 ／ 病床 180</p>
        <p className="mt-1.5 text-[9px] font-semibold text-gray-500">PTの口コミ（6項目）</p>
        {items.map(([label, v]) => (
          <div key={label} className="mt-1 flex items-center gap-1.5">
            <span className="w-16 shrink-0 text-[8px] text-gray-700">{label}</span>
            <span className="h-1.5 flex-1 rounded-full bg-gray-100">
              <span className="block h-1.5 rounded-full bg-brand-500" style={{ width: `${(v / 5) * 100}%` }} />
            </span>
            <span className="w-5 text-right text-[8px] font-semibold text-gray-800">{v}</span>
          </div>
        ))}
      </div>
    </Phone>
  );
}

export function MockPost() {
  return (
    <Phone label="症例の共有・相談：公開範囲や匿名も選べます">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs">👤</span>
        <div>
          <p className="text-[10px] font-semibold text-gray-900">田中 太郎 PT</p>
          <p className="text-[8px] text-gray-500">理学療法士 ・ 5年目</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        <span className="rounded-full bg-emerald-50 px-1.5 py-px text-[8px] font-semibold text-emerald-700">症例報告</span>
        <span className="rounded-full bg-cyan-50 px-1.5 py-px text-[8px] font-semibold text-brand-800">脳血管</span>
        <span className="rounded-full bg-indigo-50 px-1.5 py-px text-[8px] font-semibold text-indigo-700">若手向け</span>
      </div>
      <p className="mt-1.5 text-[11px] font-bold leading-snug text-gray-900">回復期の脳卒中で、立位の荷重が入らない方への介入を振り返る</p>
      <p className="mt-1 text-[9px] leading-snug text-gray-700">麻痺側への荷重練習で、まず体幹の…（個人が特定される情報は、書きません）</p>
      <div className="mt-2 flex gap-3 text-[9px] text-gray-600">
        <span>🤍 いいね 12</span>
        <span>💬 コメント 4</span>
      </div>
      <div className="mt-2 rounded-xl bg-gray-50 p-2">
        <p className="text-[9px] font-semibold text-gray-900">コメント</p>
        <p className="mt-1 text-[9px] leading-snug text-gray-700">装具の調整も、あわせて見直すと…</p>
      </div>
      <div className="mt-2 rounded-xl border border-gray-200 px-2 py-1 text-[9px] text-gray-700">🔒 公開範囲：全員 ／ フォロワー ／ 自分だけ</div>
    </Phone>
  );
}
