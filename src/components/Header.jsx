import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // 검색 탭을 활성으로 취급할 경로들
  const isSearchActive =
    location.pathname === "/" || location.pathname === "/results";

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        {/* 로고 */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight text-neutral-800"
        >
          <span>🔍</span>
          <span>REPOINSIGHT</span>
        </NavLink>

        {/* 상단 메뉴 */}
        <nav className="ml-auto flex items-center gap-1 text-sm">
          {/* 요약하기 */}
          <NavLink
            to="/summary"
            className={({ isActive }) =>
              [
                "rounded-full px-4 py-1.5 transition-colors",
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100",
              ].join(" ")
            }
          >
            요약하기
          </NavLink>

          {/* 검색하기: /, /results 에서 모두 활성 */}
          <NavLink
            to="/"
            className={() =>
              [
                "rounded-full px-4 py-1.5 font-medium transition-colors",
                isSearchActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100",
              ].join(" ")
            }
          >
            검색하기
          </NavLink>
        </nav>
      </div>
    </header>
  );
}