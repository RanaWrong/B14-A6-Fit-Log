"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isLoaded } = useFitLog();

  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  const planCount = isLoaded ? plan.length : 0;
  const savedCount = isLoaded ? saved.length : 0;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#202228] bg-[#0b0c0e]">
      <div className="mx-auto flex h-[61px] max-w-[1200px] items-center justify-between px-5">
        {/* Brand Logo with repo asset */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog"
            className="h-6 w-6 object-contain"
          />
          <span className="text-[16px] font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              isHome
                ? "bg-[#18220a] text-[#baff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              isMyPlan
                ? "bg-[#18220a] text-[#baff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-5 text-xs">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-400 transition hover:text-white"
          >
            <span>Plan</span>
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#baff00] px-1 text-[10px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-400 transition hover:text-white"
          >
            <span>Saved</span>
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full border border-[#30343b] px-1 text-[10px] text-gray-300">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
