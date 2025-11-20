export default function LoadingOverlay() {
  return (
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
  );
}