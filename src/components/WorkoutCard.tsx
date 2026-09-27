import Link from "next/link";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
  asLink?: boolean;
}

export default function WorkoutCard({ workout, asLink = true }: WorkoutCardProps) {
  const cardContent = (
    <>
      <div className="relative h-[220px] overflow-hidden bg-[#101216]">
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15171c]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#baff00] px-3 py-1 text-[11px] font-bold uppercase text-black transition-colors"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-xl font-black uppercase text-white transition-colors group-hover:text-[#baff00]">
          {workout.name}
        </h3>
        <p className="mt-1 text-sm text-gray-400">{workout.equipment}</p>
        <div className="my-4 border-t border-[#292c32]" />
        <div className="flex items-center justify-between gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">◷ {workout.duration} min</span>
          <span className="flex items-center gap-1.5">● {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1.5 text-amber-400">☆ {workout.rating}</span>
        </div>
      </div>
    </>
  );

  if (asLink) {
    return (
      <Link
        href={`/workout/${workout.id}`}
        className="group block overflow-hidden rounded-2xl border border-[#292c32] bg-[#15171c] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#baff00] hover:shadow-[0_12px_30px_rgba(186,255,0,0.07)]"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="group block overflow-hidden rounded-2xl border border-[#292c32] bg-[#15171c]">
      {cardContent}
    </div>
  );
}
