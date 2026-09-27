"use client";

import Link from "next/link";
import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

interface WorkoutDetailClientProps {
  workout: Workout;
}

export default function WorkoutDetailClient({ workout }: WorkoutDetailClientProps) {
  const { plan, addToPlan, saveForLater, isInPlan, isSaved } = useFitLog();

  const handleAddToPlan = () => {
    addToPlan(workout);
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
  };

  const isPlanFull = plan.length >= 5 && !isInPlan(workout.id);

  const specRows = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating.toString(), isLast: true },
  ];

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-5 py-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to workouts
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column: Visual/Media */}
          <div>
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full max-h-[650px] w-full rounded-xl object-cover"
            />
          </div>

          {/* Right Column: Details & Actions */}
          <div>
            <h1 className="text-4xl font-black uppercase leading-tight text-white md:text-5xl">
              {workout.name}
            </h1>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#baff00] px-3 py-1 text-[10px] font-bold uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Key Specs Panel */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[#282c33] bg-[#15181e]">
              {specRows.map((spec) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-4 py-3 ${
                    !spec.isLast ? "border-b border-[#242831]" : ""
                  }`}
                >
                  <span className="text-[9px] font-medium tracking-wide text-gray-400">
                    {spec.label}
                  </span>
                  <span className="text-[11px] text-gray-200">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-wide text-white">
                Instructions
              </h2>
              <ol className="mt-4 space-y-4">
                {workout.instructions.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-xs leading-5 text-gray-400"
                  >
                    <span className="font-bold text-[#baff00]">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Call to action buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={handleAddToPlan}
                disabled={isPlanFull}
                className="rounded-md bg-[#baff00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#caff32] disabled:cursor-not-allowed disabled:opacity-50"
              >
                ✓ Add to today&apos;s plan
              </button>

              <button
                onClick={handleSaveForLater}
                className="rounded-md border border-[#343943] px-5 py-3 text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
              >
                ♧ Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
