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

      <div className="w-full flex justify-start mt-2 px-2">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 shadow"
        >
          ← 다시 검색하기
        </button>
      </div>

      <div className="rounded-2xl border p-8 bg-white h-[650px] overflow-y-auto">
        {repositories.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3 rounded-2xl px-8 py-6">
              <div className="text-4xl">🔍</div>
              <p className="text-sm font-semibold text-neutral-800">
                검색 결과가 없어요
              </p>
              <p className="text-xs text-neutral-500">
                키워드를 조금 다르게 입력해 보거나 언어를 변경해서 다시 검색해 주세요.
              </p>
            </div>
          </div>
        ) : (
          repositories.map((repo) => (
            <RepoResultCard
              key={repo.html_url ?? repo.name}
              name={repo.name}
              url={repo.html_url}
              stars={repo.stargazers_count}
              features={repo.function_summary}
              languages={repo.languages}
            />
          ))
        )}
      </div>
    </section>
  );
}