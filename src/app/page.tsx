import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getWorkouts } from "@/lib/api";

export const revalidate = 60;

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <Hero />
      <LibrarySection initialWorkouts={workouts} />
    </main>
  );
}
