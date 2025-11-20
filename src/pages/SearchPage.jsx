import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageTag from "../components/LanguageTag.jsx";
import LanguageSelectModal from "../components/LanguageSelectModal.jsx";
import useSearchFetch from "../hooks/useSearchFetch.js";

const INITIAL_LANGUAGES = ["Python", "JavaScript", "Ruby", "Go"];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] =
    useState(INITIAL_LANGUAGES);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const navigate = useNavigate();

  // /api/v1/repositories/search 로 POST 요청 보내는 훅
  const {
    data: searchResult,
    loading,
    error,
    execute: fetchRepositories,
  } = useSearchFetch("/api/v1/repositories/search", {
    method: "POST",
  });

  const handleRemoveLanguage = (lang) => {
    setSelectedLanguages((prev) => prev.filter((item) => item !== lang));
  };

  const handleLanguageButtonClick = () => {
    setIsLanguageModalOpen(true);
  };

  const handleSaveLanguages = (langs) => {
    setSelectedLanguages(langs);
    setIsLanguageModalOpen(false);
  };

  const handleCloseLanguageModal = () => {
    setIsLanguageModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) {
      // keyword는 필수라서 빈값이면 그냥 리턴 (필요하면 안내문 추가)
      return;
    }

    const payload = {
      keyword: trimmed,
      languages: selectedLanguages, // [] 가능
    };

    try {
      const result = await fetchRepositories(payload);

      // 서버 응답(result)을 검색 결과 페이지로 넘기면서 이동
      navigate("/results", {
        state: {
          repositories: result, // 서버에서 온 배열 그대로
          keyword: trimmed,
          languages: selectedLanguages,
        },
      });
    } catch (e) {
      console.error("검색 요청 실패:", e);
    }
  };

  return (
    <section className="relative space-y-8">
      {/* 페이지 상단 제목 */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          레포지토리 검색
        </h1>
        <p className="text-sm text-neutral-500">
          찾고 싶은 레포지토리를 검색해보세요!
        </p>
      </div>

      {/* 검색 카드 */}
      <div className="rounded-2xl border border-neutral-200 bg-white px-16 py-56 shadow-sm">
        <div className="flex flex-col items-center gap-20">
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

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4 text-sm"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              {/* 언어 선택 버튼 */}
              <button
                type="button"
                onClick={handleLanguageButtonClick}
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
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 shrink-0 rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-neutral-800 cursor-pointer"
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
                    onRemove={() => handleRemoveLanguage(lang)}
                  />
                ))}
              </div>

              {selectedLanguages.length > 0 && (
                <p className="text-xs text-neutral-400">
                  X 버튼을 눌러 지울 수 있어요!
                </p>
              )}
            </div>

            {/* 에러 메시지 (있다면) */}
            {error && (
              <p className="text-xs text-red-500">
                검색 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* 언어 선택 모달 */}
      {isLanguageModalOpen && (
        <LanguageSelectModal
          selectedLanguages={selectedLanguages}
          onSave={handleSaveLanguages}
          onClose={handleCloseLanguageModal}
        />
      )}

      {/* 로딩 오버레이 */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="rounded-2xl bg-white px-6 py-4 shadow-md">
            <p className="text-sm text-neutral-700">
              레포지토리를 검색하고 있어요...
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchPage;