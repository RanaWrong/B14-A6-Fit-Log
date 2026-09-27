import { Workout } from "@/types/workout";
import fallbackWorkouts from "@/data/fallbackWorkouts.json";

const PRIMARY_API = "https://api.abcz.workers.dev/api/fitlog";
const ALT_API = "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  // Try primary API
  try {
    const res = await fetch(PRIMARY_API, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Primary API failed, trying alternative API:", err);
  }

  // Try alternative API
  try {
    const res = await fetch(ALT_API, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Alternative API failed, falling back to local dataset:", err);
  }

  return fallbackWorkouts as Workout[];
}

export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  const numericId = Number(id);

  // Try primary API
  try {
    const res = await fetch(`${PRIMARY_API}/${id}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        return data;
      }
    }
  } catch (err) {
    console.warn(`Primary API failed for workout ${id}:`, err);
  }

  // Try alternative API
  try {
    const res = await fetch(`${ALT_API}/${id}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        return data;
      }
    }
  } catch (err) {
    console.warn(`Alternative API failed for workout ${id}:`, err);
  }

  // Fallback to local dataset
  const match = (fallbackWorkouts as Workout[]).find((w) => w.id === numericId);
  return match || null;
}
