"use client";

import { useState } from "react";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import WorkoutCard from "@/components/WorkoutCard";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    isDone,
    isLoaded,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const currentList = activeTab === "plan" ? plan : saved;

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-5 py-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black uppercase text-white md:text-5xl">
            MY PLAN
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary Row */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#292c32] bg-[#15171c] p-5">
            <p className="text-[10px] font-bold tracking-widest text-gray-500">
              EXERCISES
            </p>
            <p className="mt-2 text-3xl font-black text-white">
              {isLoaded ? plan.length : 0}
            </p>
          </div>

          <div className="rounded-xl border border-[#292c32] bg-[#15171c] p-5">
            <p className="text-[10px] font-bold tracking-widest text-gray-500">
              MINUTES
            </p>
            <p className="mt-2 text-3xl font-black text-white">
              {isLoaded ? totalMinutes : 0}
            </p>
          </div>

          <div className="rounded-xl border border-[#292c32] bg-[#15171c] p-5">
            <p className="text-[10px] font-bold tracking-widest text-gray-500">
              CALORIES
            </p>
            <p className="mt-2 text-3xl font-black text-white">
              {isLoaded ? totalCalories : 0}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-3 border-b border-[#292c32] pb-3">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
              activeTab === "plan"
                ? "bg-[#baff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
              activeTab === "saved"
                ? "bg-[#baff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Loading state before hydration */}
        {!isLoaded ? (
          <div className="py-20 text-center">
            <div className="inline-flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-[#292c32] border-t-[#baff00]" />
            <p className="mt-3 text-sm text-gray-400">Loading workouts…</p>
          </div>
        ) : currentList.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#292c32] bg-[#15171c] text-3xl">
              {activeTab === "plan" ? "📋" : "🔖"}
            </div>
            <h2 className="font-heading text-2xl font-black uppercase text-white">
              NOTHING HERE YET
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "No saved workouts yet. Save workouts to quickly access them later."}
            </p>
            <Link
              href="/#library"
              className="mt-6 inline-block rounded-md bg-[#baff00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#caff32]"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        ) : (
          /* Cards Grid */
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="overflow-hidden rounded-2xl border border-[#292c32] bg-[#15171c]"
              >
                <WorkoutCard workout={workout} asLink={false} />

                {activeTab === "plan" ? (
                  <div className="flex gap-2 border-t border-[#292c32] p-4">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex-1 rounded-md border border-[#343943] px-3 py-2 text-center text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => toggleDone(workout.id)}
                      className={`rounded-md px-3 py-2 text-xs font-bold transition ${
                        isDone(workout.id)
                          ? "bg-[#baff00] text-black"
                          : "border border-[#343943] text-gray-300 hover:text-white"
                      }`}
                    >
                      {isDone(workout.id) ? "✓ Done" : "Mark as Done"}
                    </button>
                    <button
                      onClick={() => removeFromPlan(workout.id)}
                      className="rounded-md border border-[#343943] px-3 py-2 text-xs text-gray-400 transition hover:border-red-400 hover:text-red-400"
                      aria-label={`Remove ${workout.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 border-t border-[#292c32] p-4">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex-1 rounded-md border border-[#343943] px-3 py-2 text-center text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeFromSaved(workout.id)}
                      className="rounded-md border border-[#343943] px-3 py-2 text-xs text-gray-400 transition hover:border-red-400 hover:text-red-400"
                      aria-label={`Remove ${workout.name}`}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
