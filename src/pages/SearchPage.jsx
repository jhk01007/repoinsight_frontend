import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageTag from "../components/LanguageTag.jsx";
import LanguageSelectModal from "../components/LanguageSelectModal.jsx";

const API_BASE_URL = "http://localhost:8000";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
    if (!trimmed) return;

    const payload = {
      keyword: trimmed,
      languages: selectedLanguages,
    };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/repositories/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();


      navigate("/results", {
        state: {
          repositories: result.results, // 배열만 넘겨줌
          keyword: trimmed,
          languages: selectedLanguages,
        },
      });
    } catch (e) {
      setError(e.message || "검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          레포지토리 검색
        </h1>
        <p className="text-sm text-neutral-500">
          찾고 싶은 레포지토리를 검색해보세요!
        </p>
      </div>

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
              <button
                type="button"
                onClick={handleLanguageButtonClick}
                className="inline-flex h-10 items-center justify-between rounded-full border border-neutral-300 bg-white px-4 text-left text-neutral-600 shadow-sm hover:bg-neutral-50 md:w-40 cursor-pointer"
              >
                <span className="truncate">언어 선택</span>
                <span className="text-xs text-neutral-400">▼</span>
              </button>

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
                  X 버튼을 눌러 지울 수 있어요
                </p>
              )}
            </div>

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

      {isLanguageModalOpen && (
        <LanguageSelectModal
          selectedLanguages={selectedLanguages}
          onSave={handleSaveLanguages}
          onClose={handleCloseLanguageModal}
        />
      )}

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-xl">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
            <p className="text-sm font-medium text-neutral-900">
              레포지토리를 검색하고 있어요
            </p>
            <p className="text-xs text-neutral-500">
              GitHub 레포지토리를 불러오고 있어요. 잠시만 기다려 주세요!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}