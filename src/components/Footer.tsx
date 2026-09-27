export default function Footer() {
  return (
    <footer className="border-t border-[#202228] bg-[#0b0c0e]">
      <div className="mx-auto flex min-h-[78px] max-w-[1200px] items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog"
            className="h-5 w-5 object-contain"
          />
          <span className="text-xs font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-right text-[11px] text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
