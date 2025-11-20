import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RepoResultCard from "../components/RepoResultCard.jsx";

export default function SearchResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const repositories = location.state?.repositories ?? [];
  const keyword = location.state?.keyword ?? "";
  const languages = location.state?.languages ?? [];

  // 👉 state 없이 들어오면 검색화면으로 돌려보냄
  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <section className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">검색 결과</h1>
        <p className="text-sm text-neutral-500">
          "{keyword}" 검색 결과 (
          {languages.length > 0 ? languages.join(", ") : "언어 전체"})
        </p>
      </div>

      <div className="rounded-2xl border p-8 bg-white h-[650px] overflow-y-auto">
        {repositories.map((repo) => (
          <RepoResultCard
            key={repo.html_url ?? repo.name}
            name={repo.name}
            url={repo.html_url}
            stars={repo.stargazers_count}
            features={repo.function_summary}
            languages={repo.languages}
          />
        ))}
      </div>
    </section>
  );
}