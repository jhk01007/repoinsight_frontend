import LanguageTag from "./LanguageTag.jsx";

export default function SearchCard({
  query,
  selectedLanguages,
  onSubmit,
  onChangeQuery,
  onOpenLanguageModal,
  onRemoveLanguage,
  error,
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-16 py-56 shadow-sm">
      <div className="flex flex-col items-center gap-20">
        {/* 타이틀 + 설명 */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="text-6xl">🔍</span>
            <span className="text-6xl font-extrabold tracking-tight">
              REPO INSIGHT
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            찾고 싶은 레포지토리의 언어와 키워드를 입력해주세요!
          </p>
        </div>

        {/* 검색 폼 */}
        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col gap-4 text-sm"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* 언어 선택 버튼 */}
            <button
              type="button"
              onClick={onOpenLanguageModal}
              className="inline-flex h-10 items-center justify-between rounded-full border border-neutral-300 bg-white px-4 text-left text-neutral-600 shadow-sm hover:bg-neutral-50 md:w-40 cursor-pointer"
            >
              <span className="truncate">언어 선택</span>
              <span className="text-xs text-neutral-400">▼</span>
            </button>

            {/* 검색 인풋 + 버튼 */}
            <div className="flex flex-1 items-center rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2">
              <input
                type="text"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
                placeholder="검색하고 싶은 레포지토리의 키워드를 입력해 주세요!"
                value={query}
                onChange={(e) => onChangeQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={query.trim() === ""}
                className={`ml-2 shrink-0 rounded-full px-4 py-1.5 text-sm font-medium text-white 
                  ${query.trim() === "" ? "bg-neutral-400 cursor-not-allowed" : "bg-neutral-900 hover:bg-neutral-800 cursor-pointer"}`}
              >
                검색
              </button>
            </div>
          </div>

          {/* 선택된 언어 태그들 */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedLanguages.map((lang) => (
                <LanguageTag
                  key={lang}
                  lang={lang}
                  onRemove={() => onRemoveLanguage(lang)}
                />
              ))}
            </div>

            {selectedLanguages.length > 0 && (
              <p className="text-xs text-neutral-400">
                X 버튼을 눌러 지울 수 있어요
              </p>
            )}
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p className="text-xs text-red-500">
              검색 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.
              <br />
              <span className="text-[11px] text-neutral-400">{error}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}