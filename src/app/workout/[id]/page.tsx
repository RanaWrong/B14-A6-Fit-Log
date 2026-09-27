import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getWorkoutById, getWorkouts } from "@/lib/api";
import WorkoutDetailClient from "@/components/WorkoutDetailClient";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const workouts = await getWorkouts();
  return workouts.map((workout) => ({
    id: workout.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    return {
      title: "Workout Not Found | FitLog",
    };
  }

  return {
    title: `${workout.name} | FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailClient workout={workout} />;
}
