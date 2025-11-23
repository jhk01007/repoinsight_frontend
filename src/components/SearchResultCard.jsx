function SearchResultCard({
  name,
  url,
  stars,
  features,   // string[]  주요 기능 목록
  languages,  // { name: string; ratio: string }[]
}) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
      {/* 상단: 레포 이름 + 스타 수 */}
      <header className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-neutral-900">{name}</h2>

        <div className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          <span>⭐</span>
          <span>{stars}</span>
        </div>
      </header>

      {/* 본문 */}
      <div className="space-y-4 text-sm text-neutral-800">
        {/* 레포 링크 */}
        <section className="space-y-1">
          <p className="text-xs font-semibold text-neutral-500">
            레포지토리 링크
          </p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-sm text-blue-600 underline-offset-2 hover:underline"
          >
            {url}
          </a>
        </section>

        {/* 주요 기능 */}
        {features?.length > 0 && (
          <section className="space-y-1">
            <p className="text-xs font-semibold text-neutral-500">주요 기능</p>
            <ul className="list-disc space-y-0.5 pl-4">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 사용된 언어 */}
        {languages?.length > 0 && (
          <section className="space-y-1">
            <p className="text-xs font-semibold text-neutral-500">
              사용된 언어
            </p>
            <ul className="list-disc space-y-0.5 pl-4">
              {languages.map((lang) => (
                <li key={lang.name}>
                  {lang.name} {lang.ratio}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

export default SearchResultCard;