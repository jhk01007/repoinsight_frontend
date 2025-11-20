import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* 큰 숫자 */}
        <h1 className="text-8xl font-extrabold text-neutral-800 tracking-widest">
          404
        </h1>

        {/* 메시지 */}
        <p className="text-lg text-neutral-600">
          찾으시는 페이지가 존재하지 않아요
        </p>

        <div className="text-5xl">😥</div>

        {/* 홈으로 돌아가기 버튼 */}
        <Link
          to="/"
          className="mt-4 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow hover:bg-neutral-800"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  );
}