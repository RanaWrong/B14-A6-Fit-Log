"use client";

import { useState, useMemo } from "react";
import { Workout, SortOption } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

interface LibrarySectionProps {
  initialWorkouts: Workout[];
  isLoading?: boolean;
}

export default function LibrarySection({
  initialWorkouts,
  isLoading = false,
}: LibrarySectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const filteredAndSortedWorkouts = useMemo(() => {
    let result = initialWorkouts;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((g) => g.toLowerCase().includes(q)) ||
          w.equipment.toLowerCase().includes(q)
      );
    }

    const sorted = [...result].sort((a, b) => {
      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return a.duration - b.duration;
    });

    return sorted;
  }, [initialWorkouts, searchQuery, sortBy]);

  return (
    <section id="library" className="mx-auto max-w-[1200px] px-5 py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white md:text-4xl">
          THE LIBRARY
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div>
        {/* Controls: Search and Sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#292c32] bg-[#15171c] px-4 py-3 pr-10 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#baff00]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm text-gray-400">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-[#292c32] bg-[#15171c] px-4 py-3 text-sm text-white outline-none focus:border-[#baff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Loading State Animation */}
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-[#292c32] border-t-[#baff00]" />
            <p className="mt-4 text-sm font-medium text-gray-400">
              Loading workouts…
            </p>
          </div>
        ) : filteredAndSortedWorkouts.length > 0 ? (
          /* Cards Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          /* No Results State */
          <div className="rounded-2xl border border-[#292c32] bg-[#15171c] py-16 text-center">
            <h3 className="text-xl font-black text-white">NO WORKOUTS FOUND</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try searching with another workout name or muscle group.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
