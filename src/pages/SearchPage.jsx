import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSelectModal from "../components/LanguageSelectModal.jsx";
import SearchHeader from "../components/SearchHeader.jsx";
import SearchCard from "../components/SearchCard.jsx";
import LoadingOverlay from "../components/LoadingOverlay.jsx";

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

      // 서버 에러 메시지 읽기
      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        console.log(errorMessage)
        try {
          const data = await response.json();
          errorMessage =
            data.message || data.error || data.detail || errorMessage;
        } catch (_) { }

        throw new Error(errorMessage);
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
      <SearchHeader />

      <SearchCard
        query={query}
        selectedLanguages={selectedLanguages}
        onSubmit={handleSubmit}
        onChangeQuery={setQuery}
        onOpenLanguageModal={handleLanguageButtonClick}
        onRemoveLanguage={handleRemoveLanguage}
        error={error}
      />

      {isLanguageModalOpen && (
        <LanguageSelectModal
          selectedLanguages={selectedLanguages}
          onSave={handleSaveLanguages}
          onClose={handleCloseLanguageModal}
        />
      )}

      {loading && <LoadingOverlay />}
    </section>
  );
}