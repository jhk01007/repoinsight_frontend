export default function LanguageTag({ lang, onRemove }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
      <span>{lang}</span>
      <button
        type="button"
        onClick={onRemove}
        className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}