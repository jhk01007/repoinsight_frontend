import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SummaryPage from "./pages/SummaryPage.jsx";
import SearchResultPage from "./pages/SearchResultPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/results" element={<SearchResultPage />} />

          {/* ❗ 없는 페이지 → NotFound */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;