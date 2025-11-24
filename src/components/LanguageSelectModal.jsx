import { useState, useMemo, useEffect } from "react";
import LanguageTag from "./LanguageTag.jsx";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LanguageSelectModal({
  selectedLanguages,
  onSave,
  onClose,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [draftSelected, setDraftSelected] = useState(selectedLanguages);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const trimmedSearch = searchTerm.trim();
  const hasSearch = trimmedSearch.length > 0;

  // 🔎 검색어가 바뀔 때마다 언어 검색 API 호출
  useEffect(() => {
    const query = trimmedSearch;

    // 검색어 없으면 요청 안 보내고 상태 초기화
    if (!query) {
      setOptions([]);
      setFetchError(null);
      return;
    }

    const controller = new AbortController();

    async function fetchLanguages() {
      try {
        setLoading(true);
        setFetchError(null);

        const response = await fetch(
          `${API_BASE_URL}/api/v1/repositories/languages/search?query=${encodeURIComponent(
            query,
          )}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch languages: ${response.status}`);
        }

        // 응답 타입: { results: string[] }
        const data = await response.json();
        const results = Array.isArray(data.results) ? data.results : [];
        setOptions(results);
      } catch (error) {
        if (error.name === "AbortError") return;
        setFetchError(error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLanguages();

    return () => {
      controller.abort();
    };
  }, [trimmedSearch]);

  const handleAddLanguage = (lang) => {
    if (!draftSelected.includes(lang)) {
      setDraftSelected((prev) => [...prev, lang]);
    }
  };

  const handleRemoveLanguage = (lang) => {
    setDraftSelected((prev) => prev.filter((item) => item !== lang));
  };

  const handleSaveClick = () => {
    onSave(draftSelected);
  };

  const filteredOptions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!hasSearch) {
      return [];
    }

    return options.filter((lang) => {
      if (draftSelected.includes(lang)) return false;
      if (!term) return true;
      return lang.toLowerCase().includes(term);
    });
  }, [searchTerm, draftSelected, options, hasSearch]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-800"
          >
            ←
          </button>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-sm font-semibold text-neutral-900">
              언어 선택
            </h2>
            <p className="text-[11px] text-neutral-400">중복 선택 가능</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-sm text-neutral-400 hover:text-neutral-700"
          >
            ✕
          </button>
        </div>

        {/* 검색 인풋 */}
        <div className="mb-3">
          <input
            type="text"
            className="h-10 w-full rounded-full border border-neutral-300 px-4 text-sm outline-none placeholder:text-neutral-400"
            placeholder="언어를 검색해 주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 추천 리스트 */}
        <div className="mb-4 h-40 overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50">
          {!hasSearch ? (
            <p className="px-4 py-3 text-sm text-neutral-400">
              검색어를 입력해 주세요.
            </p>
          ) : loading ? (
            <p className="px-4 py-3 text-sm text-neutral-400">
              언어 목록을 불러오는 중입니다...
            </p>
          ) : fetchError ? (
            <p className="px-4 py-3 text-sm text-red-500">
              언어 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
            </p>
          ) : filteredOptions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-neutral-400">
              일치하는 언어가 없어요.
            </p>
          ) : (
            filteredOptions.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleAddLanguage(lang)}
                className="flex w-full items-center justify-between px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-100 cursor-pointer"
              >
                <span>{lang}</span>
              </button>
            ))
          )}
        </div>

        {/* 선택된 언어 태그들 */}
        <div className="mb-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            {draftSelected.map((lang) => (
              <LanguageTag
                key={lang}
                lang={lang}
                onRemove={() => handleRemoveLanguage(lang)}
              />
            ))}
          </div>
          {draftSelected.length > 0 && (
            <p className="text-[11px] text-neutral-400">
              X 버튼을 눌러 지울 수 있어요.
            </p>
          )}
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={handleSaveClick}
            className="cursor-pointer rounded-full bg-neutral-900 px-6 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}